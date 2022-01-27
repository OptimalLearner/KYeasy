window.addEventListener('load', () => {
    //const params = (new URL(document.location)).searchParams;
    //const fullname = params.get('fullname');
    //const aadhar= params.get('aadhar');
    const fullname = localStorage.getItem('FULLNAME');
    
    //const surname = localStorage.getItem('SURNAME');
    document.getElementById('result-name').innerHTML = fullname;
    //document.getElementById('result-aadhar').innerHTML = aadhar;
    })