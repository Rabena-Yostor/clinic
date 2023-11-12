import React, { useState } from 'react';

const ViewEmploymentContractInfo = () => {
  // Define the initial state for contract terms
  
  const [contractTerms, setContractTerms] = useState({
  
    startDate: '01/01/2023',
    endDate: '01/01/2026',
    jobTitle: 'Doctor',
    duties: 'Provide medical services, diagnose patients, etc.',
    compensation: 'Salary, bonuses, benefits, etc.',
    workingHours: '36 hours per week',
    terminationNotice: '30 days',
  });

  const [accepted, setAccepted] = useState(false);
  const handleAcceptContract = () => {
    // You can add your logic here to handle the contract acceptance.
    // This could involve making an API request to save the acceptance status.


    // For this example, we'll simply set the 'accepted' state to true.
    setAccepted(true);
  };

  return (
    <div>
      <h1>Doctor Employment Contract</h1>
      



      <p><strong>Effective Date:</strong> {contractTerms.startDate}</p>
      <p><strong>Termination Date:</strong> {contractTerms.endDate}</p>

      <h2>1. Job Title and Duties</h2>
      <p>The Employer hereby employs the Doctor as a {contractTerms.jobTitle}.</p>
      <p>The Doctor's primary duties shall include, but not be limited to: {contractTerms.duties}</p>

      <h2>2. Compensation</h2>
      <p>The Doctor shall receive the following compensation for their services: {contractTerms.compensation}</p>

      <h2>3. Working Hours</h2>
      <p>The Doctor shall work {contractTerms.workingHours} per week.</p>

      <h2>4. Termination</h2>
      <p>The Doctor or Employer may terminate this Contract with {contractTerms.terminationNotice} days' notice.</p>

      <h2>5. Confidentiality</h2>
      <p>The Doctor agrees to maintain the confidentiality of patient information and other proprietary information.</p>

      <h2>6. Governing Law</h2>
      <p>This Contract shall be governed by and construed in accordance with the laws of [Your Jurisdiction].</p>
      {accepted ? (
        <p>Contract Accepted</p>
      ) : (
        <div>
          <p>Please review the contract terms above and click the button below to accept the contract.</p>
          <button onClick={handleAcceptContract}>Accept Contract</button>
        </div>
        )}
    </div>
  );
};

export default ViewEmploymentContractInfo;

