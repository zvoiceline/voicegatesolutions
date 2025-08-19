import React, { useState } from 'react';
import { CreditCard, DollarSign, Calendar, Plus, Trash2, CheckCircle } from 'lucide-react';

interface PayoutMethod {
  id: string;
  type: 'bank' | 'paypal' | 'crypto';
  name: string;
  details: string;
  isDefault: boolean;
}

function InterpreterPayouts() {
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>([
    {
      id: '1',
      type: 'bank',
      name: 'Chase Bank Account',
      details: '****1234',
      isDefault: true
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMethod, setNewMethod] = useState({
    type: 'bank',
    name: '',
    details: ''
  });

  const payoutHistory = [
    {
      id: '1',
      amount: 150.75,
      date: '2024-01-15',
      status: 'completed',
      method: 'Bank Transfer'
    },
    {
      id: '2',
      amount: 89.25,
      date: '2024-01-08',
      status: 'completed',
      method: 'Bank Transfer'
    },
    {
      id: '3',
      amount: 203.50,
      date: '2024-01-01',
      status: 'pending',
      method: 'Bank Transfer'
    }
  ];

  const handleAddMethod = (e: React.FormEvent) => {
    e.preventDefault();
    const method: PayoutMethod = {
      id: Date.now().toString(),
      type: newMethod.type as 'bank' | 'paypal' | 'crypto',
      name: newMethod.name,
      details: newMethod.details,
      isDefault: payoutMethods.length === 0
    };
    setPayoutMethods([...payoutMethods, method]);
    setNewMethod({ type: 'bank', name: '', details: '' });
    setShowAddForm(false);
  };

  const handleRemoveMethod = (id: string) => {
    setPayoutMethods(payoutMethods.filter(method => method.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setPayoutMethods(payoutMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'bank': return '🏦';
      case 'paypal': return '💳';
      case 'crypto': return '₿';
      default: return '💳';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payouts & Earnings</h1>
          <p className="text-gray-600 mt-2">Manage your payment methods and view earnings history</p>
        </div>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">$0.00</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Last Month</p>
              <p className="text-2xl font-bold text-gray-900">$443.50</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Earned</p>
              <p className="text-2xl font-bold text-gray-900">$1,247.85</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">$203.50</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Method
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Add Method Form */}
          {showAddForm && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <form onSubmit={handleAddMethod} className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Add Payment Method</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={newMethod.type}
                      onChange={(e) => setNewMethod({...newMethod, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="bank">Bank Account</option>
                      <option value="paypal">PayPal</option>
                      <option value="crypto">Cryptocurrency</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={newMethod.name}
                      onChange={(e) => setNewMethod({...newMethod, name: e.target.value})}
                      placeholder="e.g., My Bank Account"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                    <input
                      type="text"
                      value={newMethod.details}
                      onChange={(e) => setNewMethod({...newMethod, details: e.target.value})}
                      placeholder="Last 4 digits or identifier"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Method
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Payment Methods List */}
          <div className="space-y-4">
            {payoutMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{getMethodIcon(method.type)}</div>
                  <div>
                    <h3 className="font-medium text-gray-900">{method.name}</h3>
                    <p className="text-sm text-gray-500">{method.details}</p>
                  </div>
                  {method.isDefault && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Default
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  {!method.isDefault && (
                    <button
                      onClick={() => handleSetDefault(method.id)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveMethod(method.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {payoutMethods.length === 0 && (
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment Methods</h3>
                <p className="text-gray-500">Add a payment method to receive your earnings.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Payout History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payoutHistory.map((payout) => (
                <tr key={payout.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payout.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${payout.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payout.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}>
                      {payout.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {payoutHistory.length === 0 && (
          <div className="p-12 text-center">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Payout History</h3>
            <p className="text-gray-500">Your payout history will appear here once you start earning.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterpreterPayouts;