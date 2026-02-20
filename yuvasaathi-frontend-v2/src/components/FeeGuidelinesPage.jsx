// src/documents/FeeGuidelinesPage.jsx (Content for the Fee Guidelines PDF download)
import React from 'react';
import { DollarSign, FileText, Banknote, List, CheckCircle } from 'lucide-react';

const FeeGuidelinesPage = () => {
    const docTitleClass = "text-3xl font-extrabold text-center mb-2 text-green-800";
    const docSubtitleClass = "text-lg text-center font-medium text-gray-600 mb-8 border-b pb-3";
    const feeItemClass = "flex justify-between items-center p-3 bg-white border-l-4 border-green-500 shadow-sm rounded-md";

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl min-h-[1000px]">
            <h1 className={docTitleClass}>RTI Fee and Payment Guidelines</h1>
            <h2 className={docSubtitleClass}>As per the Bihar Right to Information Rules, 2008 (and subsequent amendments)</h2>
            
            <div className="space-y-8">

                <section>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2 mb-4">
                        <DollarSign size={24} className="text-green-600"/> 1. Initial Application Fee
                    </h3>
                    <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-lg font-semibold text-gray-800 mb-3">Amount Payable:</p>
                        <div className={feeItemClass}>
                            <span className="font-medium">For each RTI application:</span>
                            <span className="text-xl font-extrabold text-green-700">₹ 10/-</span>
                        </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">
                        *Note: Persons below the poverty line (BPL) are exempted from the initial application fee, provided they submit a copy of a valid BPL card.*
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2 mb-4">
                        <FileText size={24} className="text-blue-600"/> 2. Additional Charges for Information
                    </h3>
                    <p className="mb-4 text-gray-700">
                        In cases where information needs to be provided in hard copy or through inspection, additional fees apply:
                    </p>
                    <ul className="space-y-3 list-none">
                        <li className={feeItemClass}>
                            <span className="flex items-center"><List size={16} className="mr-2"/> For A4 or A3 size paper copy:</span>
                            <span className="font-bold text-gray-800">₹ 2/- per page</span>
                        </li>
                        <li className={feeItemClass}>
                            <span className="flex items-center"><List size={16} className="mr-2"/> For large-size paper copy (actual cost):</span>
                            <span className="font-bold text-gray-800">Actual Price</span>
                        </li>
                        <li className={feeItemClass}>
                            <span className="flex items-center"><List size={16} className="mr-2"/> For information on CD/Floppy:</span>
                            <span className="font-bold text-gray-800">₹ 50/- per CD/Floppy</span>
                        </li>
                        <li className={feeItemClass}>
                            <span className="flex items-center"><List size={16} className="mr-2"/> Inspection of records (first hour):</span>
                            <span className="font-bold text-gray-800">FREE</span>
                        </li>
                        <li className={feeItemClass}>
                            <span className="flex items-center"><List size={16} className="mr-2"/> Inspection of records (subsequent 15 mins):</span>
                            <span className="font-bold text-gray-800">₹ 5/-</span>
                        </li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2 mb-4">
                        <Banknote size={24} className="text-red-600"/> 3. Mode of Payment
                    </h3>
                    <p className="mb-4 text-gray-700">
                        Payment must be made in favor of the **Accounts Officer, Department of Labour Resources, Government of Bihar**, through one of the following acceptable methods:
                    </p>
                    <ul className="list-disc pl-8 space-y-2 text-gray-700">
                        <li>Demand Draft (DD) or Banker's Cheque</li>
                        <li>Treasury Challan (Paid into the appropriate Head of Account)</li>
                        <li>Indian Postal Order (IPO)</li>
                        <li>Cash payment at the counter against a proper receipt</li>
                    </ul>
                    <p className="mt-4 p-3 bg-red-50 text-red-800 text-sm rounded flex items-center">
                        <CheckCircle size={16} className="mr-2"/> Personal cheques and UPI payments are generally **NOT** accepted for RTI fees.
                    </p>
                </section>

            </div>

            <footer className="mt-12 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
                Document Version: 1.2 | Last Updated: 2023-08-15 | Jurisdiction: State of Bihar.
            </footer>
        </div>
    );
};

export default FeeGuidelinesPage;