import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { format } from 'date-fns';
import { Trash2, CheckCircle, Circle, Car, Home, LogOut, AlertCircle } from 'lucide-react';

interface Inquiry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  itemType: 'car' | 'property';
  itemId: string;
  itemName: string;
  createdAt: string;
  status: 'new' | 'read' | 'archived';
}

export default function AdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'read'>('all');
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setInquiries([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Inquiry[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Inquiry);
      });
      setInquiries(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching inquiries:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async () => {
    setAuthError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.code === 'auth/configuration-not-found') {
        setAuthError("Google Sign-In is not enabled in your Firebase project. Please go to Firebase Console > Authentication > Sign-in method, and enable Google.");
      } else if (error.code === 'auth/unauthorized-domain') {
        setAuthError("This domain is not authorized for OAuth operations. Please add this app's URL to the Authorized Domains list in Firebase Console > Authentication > Settings.");
      } else {
        setAuthError(error.message || "An error occurred during sign in.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const markAsRead = async (id: string, currentStatus: string) => {
    if (currentStatus === 'read') return;
    try {
      await updateDoc(doc(db, 'inquiries', id), { status: 'read' });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await deleteDoc(doc(db, 'inquiries', id));
      } catch (error) {
        console.error("Error deleting inquiry:", error);
      }
    }
  };

  const filteredInquiries = inquiries.filter(i => {
    if (filter === 'all') return i.status !== 'archived';
    return i.status === filter;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6 md:px-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6 md:px-12 flex justify-center items-center">
        <div className="bg-white p-12 rounded-xl border border-gray-200 text-center max-w-lg w-full shadow-sm">
          <h1 className="text-3xl font-black uppercase mb-4">Admin Access</h1>
          <p className="text-gray-500 mb-8">Please sign in to view inquiries.</p>
          
          {authError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-left">
              <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-red-800">{authError}</p>
            </div>
          )}

          <button 
            onClick={handleLogin}
            className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-md"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-8">
          <div>
            <h1 className="text-4xl font-black uppercase">Admin Dashboard</h1>
            <h2 className="text-xl text-gray-500 font-medium mt-2">Manage Inquiries</h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-end md:items-center gap-6 mt-6 md:mt-0">
            <div className="flex gap-4">
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm font-bold tracking-widest uppercase transition-colors ${filter === 'all' ? 'bg-black text-white' : 'bg-white text-black border border-gray-200'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('new')}
                className={`px-4 py-2 text-sm font-bold tracking-widest uppercase transition-colors ${filter === 'new' ? 'bg-black text-white' : 'bg-white text-black border border-gray-200'}`}
              >
                New
              </button>
              <button 
                onClick={() => setFilter('read')}
                className={`px-4 py-2 text-sm font-bold tracking-widest uppercase transition-colors ${filter === 'read' ? 'bg-black text-white' : 'bg-white text-black border border-gray-200'}`}
              >
                Read
              </button>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold tracking-widest uppercase text-gray-500 hover:text-black transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
            <p className="text-gray-500 text-lg">No inquiries found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredInquiries.map((inquiry) => (
              <div 
                key={inquiry.id} 
                className={`bg-white p-6 rounded-xl border transition-all ${inquiry.status === 'new' ? 'border-l-4 border-l-red-600 border-gray-200 shadow-md' : 'border-gray-200 opacity-75'}`}
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {inquiry.itemType === 'car' ? (
                        <span className="bg-red-100 text-red-800 p-1.5 rounded-md"><Car size={16} /></span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-800 p-1.5 rounded-md"><Home size={16} /></span>
                      )}
                      <span className="font-bold uppercase tracking-widest text-sm">{inquiry.itemName}</span>
                      {inquiry.status === 'new' && (
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">New</span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold mt-4">{inquiry.firstName} {inquiry.lastName}</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm text-gray-600">
                      <a href={`mailto:${inquiry.email}`} className="hover:text-black hover:underline">{inquiry.email}</a>
                      {inquiry.phone && <a href={`tel:${inquiry.phone}`} className="hover:text-black hover:underline">{inquiry.phone}</a>}
                      <span>{format(new Date(inquiry.createdAt), 'MMM d, yyyy h:mm a')}</span>
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-gray-800 whitespace-pre-wrap">{inquiry.message}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col justify-end gap-3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                    <button 
                      onClick={() => markAsRead(inquiry.id, inquiry.status)}
                      disabled={inquiry.status === 'read'}
                      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-bold uppercase tracking-widest transition-colors ${inquiry.status === 'read' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                    >
                      {inquiry.status === 'read' ? <CheckCircle size={16} /> : <Circle size={16} />}
                      {inquiry.status === 'read' ? 'Read' : 'Mark Read'}
                    </button>
                    <button 
                      onClick={() => deleteInquiry(inquiry.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-bold uppercase tracking-widest text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
