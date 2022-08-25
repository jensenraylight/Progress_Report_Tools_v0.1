import * as React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import {useState} from 'react';
import {useRef} from 'react';


const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};


// var ReportStore = [];
// var ReportImageStore = [];


function ReportForm() {


  //Report form State
  const [formFromInput, setFormFromInput] = useState([]);
  const [imgFile, setImgFile] = useState([]);
  const [projectReportId, setProjectReportId] = useState(1);


  const [createForm, setCreateForm] = useState([]);

  //Event State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

//JSON Template
  // var report = {
  //   'Project name': ,
  //   'progress': ,
  //   'publisher': ,
  //   'date': ,
  //   'deadline': ,
  //   'days progress': ,
  //   'images': []
  // }

  







  //REF
  const projectNameRef = useRef(null);
  const progressRef = useRef(null);
  const publisherRef = useRef(null);
  const DateRef = useRef(null);
  const deadlineRef = useRef(null);
  const daysProgressedRef = useRef(null);
  const imagesUploadRef = useRef(null);

  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProjectReportId( projectReportId + 1 );
    setCreateForm([...createForm, {imagesId:{projectReportId}, reportForm:{formFromInput}, images:{imgFile}} ]);
    
    setIsSubmitted(true);
    setIsPreview(false);

    console.log(createForm);
    setFormFromInput([]);
    setImgFile([]);


    //null the ref
    projectNameRef.current.value = '';
    progressRef.current.value = '';
    publisherRef.current.value = '';
    DateRef.current.value = '';
    deadlineRef.current.value = '';
    daysProgressedRef.current.value = ''
    imagesUploadRef.current.value = ''


    
  }



  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const Name = event.target.name;
    const value = event.target.value;    
    setFormFromInput(values => ({...values, [Name]: value, } ) );

  }



  const uploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    var getFiles = URL.createObjectURL(event.target.files[0]); 
    setImgFile(values => [...values, getFiles]);
    setIsPreview(true);

  }

  const PreviewImage = () => {


    return(
      <>
      {imgFile.map( tempimages => {
        return (
        <li>
          <img src={tempimages}/>
        </li>
        )
      } )}
      </>
    )
  }


  function ReportPosting() {

    return (


      <ul>
      {
        createForm.map(form => 
            <li key={form.length}>
              <h1> Project Name: {form.reportForm.formFromInput.ProjectName}</h1>
              <p>Project Id:{form.imagesId.projectReportId} </p>
              <p>Progress: {form.reportForm.formFromInput.Progress}</p>
              <p>Publisher: {form.reportForm.formFromInput.Publisher}</p>
              <p>Date: {form.reportForm.formFromInput.Date}</p>
              <p>Deadline: {form.reportForm.formFromInput.Deadline}</p>
              <p>Days Progressed: {form.reportForm.formFromInput.DaysProgressed}</p>

              {form.images.imgFile.map(form2 => {
                return(
                  <li>
                    <img src={form2} alt=""/>
                  </li>
                )
              })}
            </li>
)
      }
 
    </ul>
  
    )
  }




  return (
  <form onSubmit={handleFormSubmit}>

    <p
      onChange={handleFormChange}
    >{projectReportId}</p>

    <label htmlFor="">Project title: </label>
      <input 
      type="text"
      ref={projectNameRef}
      name='ProjectName'
      placeholder="Project Name"
      onChange={handleFormChange}
      />
      
    <label htmlFor="">Progress: </label>
      <input 
      type="text"
      ref={progressRef}
      name='Progress'
      placeholder="Progress"
      onChange={handleFormChange}
      />

    <label htmlFor="">Publisher: </label>
      <input 
      type="text"
      ref={publisherRef}
      name='Publisher'
      placeholder="Publisher"
      onChange={handleFormChange}
      />
      
    <label htmlFor="">Date: </label>
      <input 
      type="text"
      ref={DateRef}
      name='Date'
      placeholder="Date"
      onChange={handleFormChange}
      />

    <label htmlFor="">Deadline </label>
      <input 
      type="text"
      ref={deadlineRef}
      name='Deadline'
      placeholder="Deadline"
      onChange={handleFormChange}
      />

    <label htmlFor="">DaysProgressed: </label>
      <input 
      type="text"
      ref={daysProgressedRef}
      name='DaysProgressed'
      placeholder="daysProgressed"
      onChange={handleFormChange}
      />                        

    <button type='submit'>press me</button>

    {isSubmitted ? <ReportPosting/> : <p></p> }
    {isPreview ? <PreviewImage/> : <p></p>}

    <label htmlFor="">upload image</label>
      <input 
      type="file"
      multiple
      ref={imagesUploadRef}
      name='images'
      onChange={uploadHandler}
      />






      {/* <img src={file} />   */}

    



  </form>

  )
}




const App = () => (
  <div style={styles}>
    {/* <Hello name="Progress" /> */}
    <h1>Progress Posting</h1>
    <ReportForm/>

  </div>
);

render(<App />, document.getElementById("root"));
