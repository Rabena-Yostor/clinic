import{useState} from 'react';

const FamilyForm = () => {
    const [Name, setName] = useState('')
    const [National_id, setNational] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [relation, setRelation] = useState('')



    const [error, setError] = useState(null)
    const [familyMembers, setFamilyMembers] = useState([]);



    const handleSubmit = async(e) => {
        e.preventDefault()
        const family = {Name,National_id,age, gender, relation}
        const response = await fetch('/api/patient/addFamilyMember', {
            method: 'POST',
           
            body: JSON.stringify(family),
            headers: {
                'Content-Type': 'application/json'
            }
        })
       const json= await response.json()
       if(!response.ok){
           setError(json.error)
       }
       if (response.ok){
        setName('')
        setNational('')
        setAge('')
        setGender('')  
        setRelation('')  
           setError(null)
           console.log('fam Created')
       }
    }
    const handleViewFamilyMembers = async () => {
        try {
            const patientUsername = localStorage.getItem('patientUsername');

            if (!patientUsername) {
              console.error('Patient username not found in localStorage');
              return;
            }
          const response = await fetch(`/api/patient/getFamilyMembers/${patientUsername}`);
          const data = await response.json();
          setFamilyMembers(data);
        } catch (error) {
          console.error('Error fetching family members:', error);
        }
      };


    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>Add FamilyMember</h3>

            <label>Family name</label>
            <input type="text"
             onChange={(e) => setName(e.target.value)}
                value={Name}
            />
            <label>family id</label>
            <input type="text"
             onChange={(e) => setNational(e.target.value)}
                value={National_id}
            />


            <label> age</label>
            <input type="text"
             onChange={(e) => setAge(e.target.value)}
                value={age}
            />

            <label> gender</label>
            <input type="text"
             onChange={(e) => setGender(e.target.value)}
                value={gender}
            />

            <label>relation </label>
            <input type="text"
             onChange={(e) => setRelation(e.target.value)}
                value={relation}
            />
           






            <button >Add familyMember </button>
            {error && <div className="error">{error}</div>}

            <button onClick={handleViewFamilyMembers}>View Registered Family Members</button>

            {familyMembers.length > 0 && (
        <div>
          <h3>Registered Family Members</h3>
          <ul>
            {familyMembers.map((member) => (
              <li key={member._id}>{member.Name}</li>
            ))}
          </ul>
        </div>
      )}
            </form>

            
    )
}

export default FamilyForm
