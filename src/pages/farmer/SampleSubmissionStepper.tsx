import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { Camera, Mic, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';

const honeyTypes = [
  { value: 'wildflower', label: 'Wildflower', icon: '🍯' },
  { value: 'cinnamon', label: 'Cinnamon', icon: '🌿' },
  { value: 'forest', label: 'Forest', icon: '🌳' },
  { value: 'coconut', label: 'Coconut Flower', icon: '🥥' },
  { value: 'mountain', label: 'Mountain', icon: '⛰️' },
];

const steps = [
  'Register Honey',
  'Request Collection',
];

export type SampleSubmission = {
  honeyType: string;
  harvestDate: string;
  quantity: string;
  photo: File | null;
  address: string;
  collectionDate: string;
  contactPref: string;
  farmerId: string;
};

const initialForm: Omit<SampleSubmission, 'farmerId'> = {
  honeyType: '',
  harvestDate: '',
  quantity: '',
  photo: null,
  address: '',
  collectionDate: '',
  contactPref: 'SMS',
};

const SampleSubmissionStepper: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmit: (sample: Omit<SampleSubmission, 'id' | 'status' | 'submittedAt'>) => void;
}> = ({ open, onClose, onSubmit }) => {
  const { user } = useAuth();
  const { submitSample } = useShop();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Omit<SampleSubmission, 'farmerId'>>(initialForm);
  const [badge, setBadge] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setStep(0);
      setForm(initialForm);
      setBadge(null);
    }
  }, [open]);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  
  const handleFinish = () => {
    if (!user) return;
    
    setBadge('Collection Scheduled! 📅');
    setTimeout(() => {
      submitSample({
        ...form,
        farmerId: user.id,
      });
      onClose();
    }, 800);
  };

  let content;
  switch (step) {
    case 0:
      content = (
        <div>
          <h2 className="text-xl font-bold mb-4">Register New Honey</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Honey Type</label>
            <div className="flex gap-2">
              {honeyTypes.map((type) => (
                <button
                  key={type.value}
                  className={`flex flex-col items-center p-3 rounded-lg border ${form.honeyType === type.value ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}
                  onClick={() => setForm(f => ({ ...f, honeyType: type.value }))}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <span className="text-xs mt-1">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Harvest Date</label>
            <div className="flex items-center gap-2">
              <input type="date" className="border rounded px-2 py-1" value={form.harvestDate} onChange={e => setForm(f => ({ ...f, harvestDate: e.target.value }))} />
              <button className="p-2" title="Voice input (coming soon)"><Mic /></button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Quantity (kg)</label>
            <div className="flex items-center gap-2">
              <input type="number" className="border rounded px-2 py-1" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} />
              <button className="p-2" title="Voice input (coming soon)"><Mic /></button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Photo (optional)</label>
            <div className="flex items-center gap-2">
              <input type="file" accept="image/*" onChange={e => setForm(f => ({ ...f, photo: e.target.files?.[0] || null }))} />
              <button className="p-2" title="Camera access instructions"><Camera /></button>
            </div>
          </div>
          <div className="mb-4 text-right">
            <Button onClick={() => { setBadge('New Harvest Registered! 🍯'); next(); }}>Continue <ChevronRight className="inline ml-1" /></Button>
          </div>
          {badge && <Badge variant="success" className="mt-2">{badge}</Badge>}
        </div>
      );
      break;
    case 1:
      content = (
        <div>
          <h2 className="text-xl font-bold mb-4">Request Sample Collection</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Confirm Address</label>
            <input type="text" className="border rounded px-2 py-1 w-full" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Your address" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Collection Date</label>
            <input type="date" className="border rounded px-2 py-1" value={form.collectionDate} onChange={e => setForm(f => ({ ...f, collectionDate: e.target.value }))} />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Contact Preference</label>
            <select className="border rounded px-2 py-1" value={form.contactPref} onChange={e => setForm(f => ({ ...f, contactPref: e.target.value }))}>
              <option value="SMS">SMS</option>
              <option value="Call">Call</option>
            </select>
          </div>
          <div className="mb-4 text-right">
            <Button onClick={handleFinish}>Submit <ChevronRight className="inline ml-1" /></Button>
          </div>
          {badge && <Badge variant="primary" className="mt-2">{badge}</Badge>}
        </div>
      );
      break;
    default:
      content = null;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 items-center">
            {steps.map((s, i) => (
              <span key={i} className={`h-2 w-2 rounded-full ${i <= step ? 'bg-amber-500' : 'bg-gray-200'}`}></span>
            ))}
          </div>
        </div>
        {content}
        <div className="flex justify-between mt-4">
          <Button variant="outline" size="sm" onClick={prev} disabled={step === 0}><ChevronLeft className="inline mr-1" />Back</Button>
        </div>
      </div>
    </Modal>
  );
};

export default SampleSubmissionStepper; 