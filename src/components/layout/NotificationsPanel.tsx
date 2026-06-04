import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CircleAlert as AlertCircle, CircleCheck as CheckCircle2, Info, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'booking';
  read: boolean;
  created_at: string;
}

export default function NotificationsPanel() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      const notifs = data as Notification[];
      setNotifications(notifs);
      setUnreadCount(notifs.filter(n => !n.read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);

      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
      if (unreadIds.length === 0) return;

      await supabase
        .from('notifications')
        .update({ read: true })
        .in('id', unreadIds);

      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'booking':
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'booking':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  if (!user) return null;

  return (
    <>
      {/* Notification Icon */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="relative p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-foreground/70" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notifications Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/20"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-16 h-[calc(100vh-64px)] w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Notifications</h2>
                  {unreadCount > 0 && (
                    <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
                  )}
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground/30 mb-3" />
                    <p className="text-sm text-muted-foreground">No notifications yet</p>
                  </div>
                ) : (
                  <div className="space-y-2 p-4">
                    {notifications.map((notif) => (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => !notif.read && markAsRead(notif.id)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${getTypeColor(notif.type)} ${
                          !notif.read ? 'bg-opacity-100' : 'bg-opacity-50'
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {getTypeIcon(notif.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h3 className="font-semibold text-sm text-foreground">
                                {notif.title}
                              </h3>
                              {!notif.read && (
                                <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {notif.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(notif.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {unreadCount > 0 && notifications.length > 0 && (
                <div className="border-t border-border p-4">
                  <button
                    onClick={markAllAsRead}
                    className="w-full text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Mark all as read
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
