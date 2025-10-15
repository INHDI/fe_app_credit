"use client";

import { useState } from 'react';
import { ContractType } from '@/types/contract';
import ContractModalFactory from '@/components/ui/ContractModalFactory';
import { Button } from '@/components/ui/button';

/**
 * Example usage of the generic contract modal system
 * This demonstrates how to use the template for different contract types
 */
export default function ContractModalUsage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contractType, setContractType] = useState<ContractType>(ContractType.TIN_CHAP);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleOpenModal = (type: ContractType) => {
    setContractType(type);
    setIsModalOpen(true);
    setError(null);
    setSuccess(null);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setError(null);
    setSuccess(null);
  };

  const handleSave = async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Contract data:', data);
      console.log('Contract type:', contractType);
      
      setSuccess(`${contractType} contract created successfully!`);
      
      // Close modal after a short delay
      setTimeout(() => {
        handleClose();
      }, 1500);
      
    } catch (err: any) {
      setError(err.message || 'Failed to create contract');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Contract Modal Examples</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          onClick={() => handleOpenModal(ContractType.TIN_CHAP)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Tín Chấp Modal
        </Button>
        
        <Button
          onClick={() => handleOpenModal(ContractType.TRA_GOP)}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Trả Góp Modal
        </Button>
        
        <Button
          onClick={() => handleOpenModal(ContractType.THE_CHAP)}
          className="bg-purple-500 hover:bg-purple-600 text-white"
        >
          Thế Chấp Modal
        </Button>
      </div>

      {/* Generic Modal Factory Usage */}
      <ContractModalFactory
        contractType={contractType}
        isOpen={isModalOpen}
        onClose={handleClose}
        onSave={handleSave}
        loading={loading}
        error={error}
        success={success}
      />
    </div>
  );
}

/**
 * Alternative usage - Direct modal usage
 * You can also use individual modals directly:
 */
export function DirectModalUsage() {
  const [isTinChapOpen, setIsTinChapOpen] = useState(false);
  const [isTraGopOpen, setIsTraGopOpen] = useState(false);
  const [isTheChapOpen, setIsTheChapOpen] = useState(false);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Direct Modal Usage</h2>
      
      <div className="space-y-2">
        <Button onClick={() => setIsTinChapOpen(true)}>
          Open Tín Chấp Modal
        </Button>
        
        <Button onClick={() => setIsTraGopOpen(true)}>
          Open Trả Góp Modal
        </Button>
        
        <Button onClick={() => setIsTheChapOpen(true)}>
          Open Thế Chấp Modal
        </Button>
      </div>

      {/* Individual modals */}
      {/* 
      <AddCreditContractModal
        isOpen={isTinChapOpen}
        onClose={() => setIsTinChapOpen(false)}
        onSave={(data) => console.log('Tin Chap:', data)}
      />
      
      <AddTraGopModal
        isOpen={isTraGopOpen}
        onClose={() => setIsTraGopOpen(false)}
        onSave={(data) => console.log('Tra Gop:', data)}
      />
      
      <AddTheChapModal
        isOpen={isTheChapOpen}
        onClose={() => setIsTheChapOpen(false)}
        onSave={(data) => console.log('The Chap:', data)}
      />
      */}
    </div>
  );
}
