import { Box, Grid, Button, TextField, MenuItem, Select,InputLabel, FormControl } from "@mui/material";
import React, { useState, useForm } from 'react';
import { useRouter } from "next/router";
import styles from "./admission-rate.module.css";



const EvaluationForm: React.FC = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [undergradSchool, setUndergradSchool] = useState('');
  const [undergradGPA, setUndergradGPA] = useState('');
  const [gpaSystem, setGpaSystem] = useState('');
  const [greScore, setGreScore] = useState('');
  const [toeflScore, setIeltsScore] = useState('');
  const [ieltsScore, setToeflScore] = useState('');
  const [relatedInternship, setRelatedInternship] = useState([]);
  const [unrelatedInternship, setUnrelatedInternship] = useState([]);
  const [company, setCompany] = useState([]);
  const [projectsInternational, setProjectsInternational] = useState('');
  const [projectsNational, setProjectsNational] = useState('');
  const [projectsMunicipal, setProjectsMunicipal] = useState('');
  const [projectsSchool, setProjectsSchool] = useState('');
  const [publications, setPublications] = useState('');
  const [targetSchool, setTargetSchool] = useState('');
  const [targetMajor, setTargetMajor] = useState('');

  const schools = ['School A', 'School B', 'School C']; // 从数据库获取
  const targetSchools = ['School X', 'School Y', 'School Z']; // 从数据库获取
  const companyList = ['公司1', '公司2', '公司3', '公司4', '公司5']; // 公司列表
  const projectCategory = ['International', 'National', 'Municipal', 'School']
  const publicationslist = ['T', 'A', 'B', 'C', 'D', 'E']

  const router = useRouter();

  // TODO:
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('xxx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(formData),
    });
    if (response.ok) {
      // 请求成功，可以执行页面导航
      history.push('/some-page'); // 替换'/some-page'为实际的目标页面路径
    }

  }

  const handleButtonClick = (menu: string) => {
    router.push(menu);
  };

  return (
    <Box
      className={styles.evaluation}
      sx={{ mx: 'auto', }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent='space-between'>
          {/*  */}
          <Grid item xs={12}>
              <TextField
                required
                id="name"
                name="name"
                label="name"
                fullWidth
                autoComplete="given-name"
                // variant="standard"
                value={name}
                onChange={(e:any) => setName(e.target.value)}
            />
          </Grid>
          
          {/* Gender */}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                labelId="gender"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={(e:any) => setGender(e.target.value)}
              >
                <MenuItem value="0">Male</MenuItem>
                <MenuItem value="1">Female</MenuItem>
                </Select>
            </FormControl>
          </Grid>
          
          {/* Undergrad School */}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="geundergradSchoolnder">Undergrad School</InputLabel>
              <Select 
                label="Undergrad School"
                name='score'
                value={undergradSchool}
                onChange={(e:any) => setUndergradSchool(e.target.value)}  
              >
                {schools.map(school => (
                  <MenuItem key={school} value={school}>{school}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* GRE Score */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="GRE Score"
                value={greScore}
                onChange={(e:any) => setGreScore(e.target.value)}
              />
            </FormControl>
          </Grid>

          {/* IELTS Score */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="IELTS Score"
                value={ieltsScore}
                onChange={(e:any) => setIeltsScore(e.target.value)}
              />
            </FormControl>
          </Grid>

          {/*  */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="TOEFL Score"
                value={toeflScore}
                onChange={(e:any) => setToeflScore(e.target.value)}
              />
            </FormControl>
          </Grid>

          {/*  */}
          <Grid item xs={4}>
            <FormControl fullWidth required>
                <InputLabel id="gpaSystem">GPA system</InputLabel>
                <Select
                  labelId="gpaSystem"
                  id="gpaSystem"
                  value={gpaSystem}
                  label="gpaSystem"
                  onChange={(e:any) => setGpaSystem(e.target.value)}
                >
                  <MenuItem value="0">4</MenuItem>
                  <MenuItem value="1">5</MenuItem>
                  </Select>
            </FormControl>
          </Grid>

          {/* Undergrad GPA */}
          <Grid item xs={8}>
            <FormControl fullWidth>
              <TextField 
                label="Undergrad GPA"
                value={undergradGPA}
                onChange={(e:any) => setUndergradGPA(e.target.value)}
              />
            </FormControl>
          </Grid>

          {/* Related Internship */}
          <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel>Related Internship(no more 3)</InputLabel>
                <Select 
                  label="Related Internship"
                  value={relatedInternship}
                  multiple
                  onChange={(e: any) => setRelatedInternship(e.target.value)}
                >
                  {companyList.map(company => (
                    <MenuItem key={company} value={company}>{company}</MenuItem>
                  ))}
                  <MenuItem value="2">其他</MenuItem>
                </Select>
              </FormControl>
          </Grid>

          {/*  */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Unrelated Internship(no more 3)</InputLabel>
                <Select 
                  label="Unrelated Internship"
                  value={unrelatedInternship}
                  multiple
                  onChange={(e: any) => setUnrelatedInternship(e.target.value)}
                >
                  {companyList.map(company => (
                    <MenuItem key={company} value={company}>{company}</MenuItem>
                  ))}
                  <MenuItem value="2">其他</MenuItem>
                </Select>
            </FormControl>
          </Grid>

          {/*  */}
          <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel>Company(no more 3)</InputLabel>
                <Select 
                  label="Company"
                  value={company}
                  multiple
                  onChange={(e: any) => setCompany(e.target.value)}
                >
                  {companyList.map(company => (
                    <MenuItem key={company} value={company}>{company}</MenuItem>
                  ))}
                  <MenuItem value="2">其他</MenuItem>
                </Select>
            </FormControl>
          </Grid>

          {/* Projects */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Projects-International-num" 
                type="number"
                value={projectsInternational}
                onChange={(e:any) => setProjectsInternational(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Projects-National-num" 
                type="number"
                value={projectsNational}
                onChange={(e:any) => setProjectsNational(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Projects-Municipal-num" 
                value={projectsMunicipal}
                type="number"
                onChange={(e:any) => setProjectsMunicipal(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Projects-School-num" 
                type="number"
                value={projectsSchool}
                onChange={(e:any) => setProjectsSchool(e.target.value)}
              />
            </FormControl>
          </Grid>
          
          {/* Publications */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>publications</InputLabel>
              <Select 
                label="publications"
                value={publications}
                onChange={(e: any) => setPublications(e.target.value)}
              >
                {publicationslist.map(publication => (
                  <MenuItem key={publication} value={publication}>{publication}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/*  */}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="targetSchool">Target School</InputLabel>
              <Select
                label="Target School"
                value={targetSchool}
                onChange={(e:any) => setTargetSchool(e.target.value)}
              >
                {targetSchools.map(school => (
                  <MenuItem key={school} value={school}>{school}</MenuItem>
                ))}  
              </Select>
            </FormControl>
          </Grid>

          {/*  */}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <TextField
                label="Target Major"
                value={targetMajor}
                onChange={(e:any) => setTargetMajor(e.target.value)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Button
          // type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            mt: 5,
          }}
          onClick={() => handleButtonClick("/admission-rate/result")}
            >
              Submit
            </Button>
      </form>
    </Box>
  )
};

export default EvaluationForm;
