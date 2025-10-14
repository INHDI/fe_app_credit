"use client";

interface TinChapSettleModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: any;
  onRefresh?: () => void;
}

export default function TinChapSettleModal({ isOpen }: TinChapSettleModalProps) {
  if (!isOpen) return null;
  return null;
}


