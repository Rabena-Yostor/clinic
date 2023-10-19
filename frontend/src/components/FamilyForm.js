import{useState} from 'react';

const FamilyForm = () => {
    const [Name, setName] = useState('')
    const [National_id, setNational] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [relation, setRelation] = useState('')



    const [error, setError] = useState(null)



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
            </form>

            
    )
}

export default FamilyForm 