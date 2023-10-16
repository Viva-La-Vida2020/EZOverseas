import { Box, Grid, Button, TextField, MenuItem, Select,InputLabel, FormControl } from "@mui/material";
import React, { useState } from 'react';
import { useRouter } from "next/router";
import styles from "./admission-rate.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { receiveEvaluationResult, toggleLoginModal } from "../../features/user/userSlice";
import { useForm } from "react-hook-form";



const EvaluationForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
  const projectCategory = [{ 'International': 1 }, { 'National': 2 }, {'Provincial': 3}, { 'Municipal':4}, { 'School': 5}]
  const publicationslist = ['T', 'A', 'B', 'C', 'D', 'E']

  // TODO:
  const onSubmit = async (data: any) => {
    const convertedData = {
      name: data.name,
      gender: Number(data.gender),
      gre: data.gre || -1,
      university: data.university,
      gpa: handleGPA(data.gpa, data.gpaSystem),
      score: handleScore(data.ieltsScore, data.toeflScore),
      paper1: Number(data.paper1) || -1,
      paper2: Number(data.paper2) || -1,
      paper3: Number(data.paper3) || -1,
      project1: Number(data.project1) || -1,
      project2: Number(data.project2) || -1,
      project3: Number(data.project3) || -1,
      relatedIntern1: Number(data.relatedIntern1) || -1,
      relatedIntern2: Number(data.relatedIntern2) || -1,
      relatedIntern3: Number(data.relatedIntern3) || -1,
      unrelatedIntern1: Number(data.unrelatedIntern1) || -1,
      unrelatedIntern2: Number(data.unrelatedIntern2) || -1,
      unrelatedIntern3: Number(data.unrelatedIntern3) || -1,
      targetSchool: 1,
      targetMajor: 1,
    //   fruits: data.fruits.map((fruit:any) => {
    //     if (fruit === 'apple') {
    //       return 3;
    //     } else if (fruit === 'banana') {
    //       return 2;
    //     }
    //     return 0; // 处理其他情况
    //   }),
    };
    console.log(convertedData);

    // post
    const response = await fetch('api1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(convertedData),
    });
    if (response.ok) {
      dispatch(receiveEvaluationResult(response)); // TODO:
      // 请求成功，可以执行页面导航
      router.push('/admission-rate/result');
    }
  };
  // TODO: 解耦
  const handleGPA = (val: any, gpaSystem: any) => (val / gpaSystem)
  const handleScore = (ieltsScore:any, toeflScore:any) => {
    ieltsScore = ieltsScore || -1
    toeflScore = toeflScore || -1

    const toeflMap = {
      '118-120': 9,
      '115-117': 8.5,
      '110-114': 8,
      '102-109': 7.5,
      '94-101': 7,
      '79-93': 6.5, 
      '60-78': 6,
      '46-59': 5.5,
      '35-45': 5,
      '32-34': 4.5,
      '0-31': 0,
      '-1':-1,
    };
  
    for (let scoreRange in toeflMap) {
      const [min, max] = scoreRange.split('-').map(Number);
      if (toeflScore >= min && toeflScore <= max) {
        toeflScore = toeflMap[scoreRange];
        break;
      }
    }

    return Math.max(ieltsScore, toeflScore)
  }

  const handleButtonClick = (menu: string) => {
    router.push(menu);
  };

  return (
    <Box
      className={styles.evaluation}
      sx={{ mx: 'auto', }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} justifyContent='space-between'>
          {/*  */}
          <Grid item xs={12}>
            <TextField
              required
              id="name"
              name="name"
              type="text"
              label="name"
              fullWidth
              autoComplete="given-name"
              // value={name}
              onChange={(e: any) => setName(e.target.value)}
              {...register("name", { required: true })}
            />
          </Grid>

          
          {/* Gender */}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                labelId="gender"
                id="demo-simple-select"
                // value={gender}
                label="Gender"
                onChange={(e: any) => setGender(e.target.value)}
                {...register('gender')}
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
                // value={undergradSchool}
                onChange={(e: any) => setUndergradSchool(e.target.value)}
                {...register('university')}
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
                // value={greScore}
                onChange={(e: any) => setGreScore(e.target.value)}
                {...register("gre")}
              />
            </FormControl>
          </Grid>

          {/* IELTS Score */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="IELTS Score"
                // value={ieltsScore}
                onChange={(e: any) => setIeltsScore(e.target.value)}
                {...register("ieltsScore")}
              />
            </FormControl>
          </Grid>

          {/* TOEFL Score */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="TOEFL Score"
                // value={toeflScore}
                onChange={(e: any) => setToeflScore(e.target.value)}
                {...register("toeflScore")}
              />
            </FormControl>
          </Grid>

          {/* gpaSystem */}
          <Grid item xs={4}>
            <FormControl fullWidth required>
                <InputLabel id="gpaSystem">GPA system</InputLabel>
                <Select
                  labelId="gpaSystem"
                  id="gpaSystem"
                  // value={gpaSystem}
                  label="gpaSystem"
                onChange={(e: any) => setGpaSystem(e.target.value)}
                {...register('gpaSystem')}
                >
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  </Select>
            </FormControl>
          </Grid>

          {/* Undergrad GPA */}
          <Grid item xs={8}>
            <FormControl fullWidth>
              <TextField 
                label="Undergrad GPA"
                // value={undergradGPA}
                onChange={(e: any) => setUndergradGPA(e.target.value)}
                {...register("gpa")}
              />
            </FormControl>
          </Grid>

          {/* Related Internship */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Related Internship1</InputLabel>
              <Select 
                label="Related Intern1"
                  {...register('relatedIntern1')}
              >
                {companyList.map(company => (
                    <MenuItem key={company} value='1'>{company}</MenuItem>
                ))}
                <MenuItem value="2">Other</MenuItem>
                <MenuItem value="-1">None</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Related Internship2</InputLabel>
              <Select 
                label="Related Intern2"
                {...register('relatedIntern2')}
              >
                {companyList.map(company => (
                  <MenuItem key={company} value='1'>{company}</MenuItem>
                ))}
                <MenuItem value="2">Other</MenuItem>
                <MenuItem value="-1">None</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Related Internship3</InputLabel>
              <Select 
                label="Related Intern3"
                {...register('relatedIntern3')}
              >
                {companyList.map(company => (
                  <MenuItem key={company} value='1'>{company}</MenuItem>
                ))}
                <MenuItem value="2">Other</MenuItem>
                <MenuItem value="-1">None</MenuItem>
                </Select>
              </FormControl>
          </Grid>

          {/* Unrelated Internship */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Unrelated Intern1</InputLabel>
              <Select 
                label="Unrelated Intern1"
                {...register('unrelatedIntern1')}
              >
                {companyList.map(company => (
                  <MenuItem key={company} value='1'>{company}</MenuItem>
                ))}
                <MenuItem value="2">Other</MenuItem>
                <MenuItem value="-1">None</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Unrelated Intern2</InputLabel>
              <Select 
                label="Unrelated Intern2"
                {...register('unrelatedIntern2')}
              >
                {companyList.map(company => (
                  <MenuItem key={company} value='1'>{company}</MenuItem>
                ))}
                <MenuItem value="2">Other</MenuItem>
                <MenuItem value="-1">None</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Unrelated Intern3</InputLabel>
              <Select 
                label="Unrelated Intern3"
                {...register('unrelatedIntern3')}
              >
                {companyList.map(company => (
                  <MenuItem key={company} value='1'>{company}</MenuItem>
                ))}
                <MenuItem value="2">Other</MenuItem>
                <MenuItem value="-1">None</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Projects */}
          <Grid item xs={4}>
            <FormControl fullWidth>
            <InputLabel>Project1</InputLabel>
              <Select 
                label="project1"
                {...register('project1')}
              >
                <MenuItem value="1">International</MenuItem>
                <MenuItem value="2">National</MenuItem>
                <MenuItem value="3">Provincial</MenuItem>
                <MenuItem value="4">Municipal</MenuItem>
                <MenuItem value="5">School</MenuItem>
                <MenuItem value="-1">None</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
            <InputLabel>Project2</InputLabel>
              <Select 
                label="project1"
                {...register('project2')}
              >
                <MenuItem value="1">International</MenuItem>
                <MenuItem value="2">National</MenuItem>
                <MenuItem value="3">Provincial</MenuItem>
                <MenuItem value="4">Municipal</MenuItem>
                <MenuItem value="5">School</MenuItem>
                <MenuItem value="-1">None</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
            <InputLabel>Project3</InputLabel>
              <Select 
                label="project3"
                {...register('project3')}
              >
                <MenuItem value="1">International</MenuItem>
                <MenuItem value="2">National</MenuItem>
                <MenuItem value="3">Provincial</MenuItem>
                <MenuItem value="4">Municipal</MenuItem>
                <MenuItem value="5">School</MenuItem>
                <MenuItem value="-1">None</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          {/* Publications */}
          <Grid item xs={4}>
            <FormControl fullWidth>
            <InputLabel>Project3</InputLabel>
              <Select 
                label="paper1"
                {...register('paper1')}
              >
                {publicationslist.map(publication => (
                  <MenuItem key={publication} value={publication}>{publication}</MenuItem>
                ))}
                <MenuItem value="-1">None</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
            <InputLabel>Project3</InputLabel>
              <Select 
                label="paper2"
                {...register('paper2')}
              >
                {publicationslist.map(publication => (
                  <MenuItem key={publication} value={publication}>{publication}</MenuItem>
                ))}
                <MenuItem value="-1">None</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
            <InputLabel>Project3</InputLabel>
              <Select 
                label="paper3"
                {...register('paper3')}
              >
                {publicationslist.map(publication => (
                  <MenuItem key={publication} value={publication}>{publication}</MenuItem>
                ))}
                <MenuItem value="-1">None</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/*  */}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="targetSchool">Target School</InputLabel>
              <Select
                label="Target School"
                {...register('targetSchool')}
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
                {...register('targetMajor')}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            mt: 5,
          }}
          onClick={() => handleButtonClick("/admission-rate/result")} // TODO: TEST-> DELETE
        >
          Submit
        </Button>
      </form>
    </Box>
  )
};

export default EvaluationForm;
