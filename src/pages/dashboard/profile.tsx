import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProfile, getUserAddresses, upsertUserProfile, addUserAddress, updateUserAddress, deleteUserAddress, setDefaultAddress, type UserProfile, type UserAddress } from '@/lib/supabase-db';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { User, MapPin, Plus, Trash2, Check, Edit2, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function AddressCard({ address, onSetDefault, onDelete, onEdit }: { address: UserAddress; onSetDefault: () => void; onDelete: () => void; onEdit: () => void }) {
  return (
    <div className={`bg-card border-2 rounded-2xl p-4 relative ${address.is_default ? 'border-primary' : 'border-border'}`}>
      {address.is_default && (
        <span className="absolute top-3 right-3 bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          <Check className="h-3 w-3" /> Default
        </span>
      )}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <p className="font-semibold text-sm text-foreground">{address.label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{address.address_line}</p>
          <p className="text-xs text-muted-foreground">{address.city}{address.state ? `, ${address.state}` : ''}, {address.country}</p>
          {address.pincode && <p className="text-xs text-muted-foreground">PIN: {address.pincode}</p>}
        </div>
      </div>
      <div className="flex gap-2">
        {!address.is_default && (
          <Button size="sm" variant="outline" onClick={onSetDefault} className="rounded-full text-xs h-7 px-3">Set Default</Button>
        )}
        <Button size="sm" variant="outline" onClick={onEdit} className="rounded-full text-xs h-7 px-3">
          <Edit2 className="h-3 w-3 mr-1" /> Edit
        </Button>
        <Button size="sm" variant="destructive" onClick={onDelete} className="rounded-full text-xs h-7 px-3">
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

const emptyAddr = { label: 'Home', address_line: '', city: '', state: '', country: '', pincode: '', is_default: false };

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ full_name: '', email: '', mobile: '' });
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [editingAddr, setEditingAddr] = useState<UserAddress | null>(null);
  const [addrForm, setAddrForm] = useState(emptyAddr);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    getUserProfile(user.id).then(({ data }) => {
      setProfile(data);
      setProfileForm({ full_name: data?.full_name ?? user.user_metadata?.full_name ?? '', email: data?.email ?? user.email ?? '', mobile: data?.mobile ?? '' });
    });
    getUserAddresses(user.id).then(({ data }) => setAddresses(data));
  }, [user]);

  async function saveProfile() {
    if (!user) return;
    setSaving(true);
    const { data } = await upsertUserProfile(user.id, profileForm);
    if (data) setProfile(data);
    setSaving(false);
    setEditingProfile(false);
  }

  async function saveAddress() {
    if (!user) return;
    setSaving(true);
    if (editingAddr) {
      const { data } = await updateUserAddress(editingAddr.id, addrForm);
      if (data) setAddresses(prev => prev.map(a => a.id === editingAddr.id ? data : a));
    } else {
      const { data } = await addUserAddress({ ...addrForm, user_id: user.id });
      if (data) setAddresses(prev => [...prev, data]);
    }
    setSaving(false);
    setShowAddrForm(false);
    setEditingAddr(null);
    setAddrForm(emptyAddr);
  }

  async function handleDelete(id: number) {
    await deleteUserAddress(id);
    setAddresses(prev => prev.filter(a => a.id !== id));
  }

  async function handleDefault(id: number) {
    if (!user) return;
    await setDefaultAddress(user.id, id);
    setAddresses(prev => prev.map(a => ({ ...a, is_default: a.id === id })));
  }

  function startEditAddr(addr: UserAddress) {
    setEditingAddr(addr);
    setAddrForm({ label: addr.label, address_line: addr.address_line, city: addr.city, state: addr.state ?? '', country: addr.country, pincode: addr.pincode ?? '', is_default: addr.is_default });
    setShowAddrForm(true);
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Profile Section */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-foreground">Personal Information</h2>
                <p className="text-xs text-muted-foreground">Update your profile details</p>
              </div>
            </div>
            {!editingProfile ? (
              <Button size="sm" variant="outline" onClick={() => setEditingProfile(true)} className="rounded-full gap-1.5">
                <Edit2 className="h-3.5 w-3.5" /> Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setEditingProfile(false)} className="rounded-full">
                  <X className="h-3.5 w-3.5" />
                </Button>
                <Button size="sm" onClick={saveProfile} disabled={saving} className="rounded-full gap-1.5">
                  <Save className="h-3.5 w-3.5" /> Save
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Full Name', key: 'full_name', type: 'text', placeholder: 'John Doe' },
              { label: 'Email', key: 'email', type: 'email', placeholder: 'you@example.com' },
              { label: 'Mobile', key: 'mobile', type: 'tel', placeholder: '+91 98765 43210' },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key} className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</Label>
                {editingProfile ? (
                  <Input type={type} value={(profileForm as Record<string, string>)[key]} onChange={e => setProfileForm(p => ({ ...p, [key]: e.target.value }))} placeholder={placeholder} className="rounded-xl" />
                ) : (
                  <p className="text-sm font-medium text-foreground bg-secondary/50 px-3 py-2 rounded-xl">
                    {(profileForm as Record<string, string>)[key] || <span className="text-muted-foreground italic">Not set</span>}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Addresses */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-foreground">Saved Addresses</h2>
                <p className="text-xs text-muted-foreground">Up to 5 addresses</p>
              </div>
            </div>
            {addresses.length < 5 && !showAddrForm && (
              <Button size="sm" onClick={() => { setEditingAddr(null); setAddrForm(emptyAddr); setShowAddrForm(true); }} className="rounded-full gap-1.5">
                <Plus className="h-3.5 w-3.5" /> Add Address
              </Button>
            )}
          </div>

          <AnimatePresence>
            {showAddrForm && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-6">
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 space-y-3">
                  <h3 className="font-semibold text-sm text-foreground">{editingAddr ? 'Edit Address' : 'New Address'}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Label</Label>
                      <Input value={addrForm.label} onChange={e => setAddrForm(p => ({ ...p, label: e.target.value }))} placeholder="Home, Office..." className="rounded-xl" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Country *</Label>
                      <Input value={addrForm.country} onChange={e => setAddrForm(p => ({ ...p, country: e.target.value }))} placeholder="India" required className="rounded-xl" />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <Label className="text-xs text-muted-foreground">Address *</Label>
                      <Input value={addrForm.address_line} onChange={e => setAddrForm(p => ({ ...p, address_line: e.target.value }))} placeholder="Street address" required className="rounded-xl" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">City *</Label>
                      <Input value={addrForm.city} onChange={e => setAddrForm(p => ({ ...p, city: e.target.value }))} placeholder="Mumbai" required className="rounded-xl" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">State</Label>
                      <Input value={addrForm.state} onChange={e => setAddrForm(p => ({ ...p, state: e.target.value }))} placeholder="Maharashtra" className="rounded-xl" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">PIN Code</Label>
                      <Input value={addrForm.pincode} onChange={e => setAddrForm(p => ({ ...p, pincode: e.target.value }))} placeholder="400001" className="rounded-xl" />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => { setShowAddrForm(false); setEditingAddr(null); }} className="rounded-full">Cancel</Button>
                    <Button size="sm" onClick={saveAddress} disabled={saving || !addrForm.address_line || !addrForm.city || !addrForm.country} className="rounded-full">
                      {saving ? 'Saving...' : editingAddr ? 'Update' : 'Save Address'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {addresses.length === 0 && !showAddrForm ? (
            <div className="text-center py-10 text-muted-foreground">
              <MapPin className="h-10 w-10 mx-auto mb-2 text-muted-foreground/30" />
              <p className="text-sm">No addresses saved yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map(addr => (
                <AddressCard key={addr.id} address={addr} onSetDefault={() => handleDefault(addr.id)} onDelete={() => handleDelete(addr.id)} onEdit={() => startEditAddr(addr)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
