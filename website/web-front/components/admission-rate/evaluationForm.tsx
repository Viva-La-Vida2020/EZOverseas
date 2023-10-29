import { Box, Grid, Button, TextField, MenuItem, Select,InputLabel, FormControl } from "@mui/material";
import React, { useState } from 'react';
import { useRouter } from "next/router";
import styles from "./admission-rate.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { receiveEvaluationResult } from "../../features/user/userSlice";
import { useForm } from "react-hook-form";
import { board_universities, companies, getUniversityCategory, target_uni, universities, us_university } from "./mockmock";

function generateRandomNumber(range) {
  const [min, max] = range.split('-').map(Number);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

  // const schools = ['School A', 'School B', 'School C']; // 从数据库获取
  // const targetSchools = ['School X', 'School Y', 'School Z']; // 从数据库获取
  // const companyList = ['公司1', '公司2', '公司3', '公司4', '公司5']; // 公司列表
  // const projectCategory = [{ 'International': 1 }, { 'National': 2 }, {'Provincial': 3}, { 'Municipal':4}, { 'School': 5}]
  const publicationslist = ['T', 'A', 'B', 'C', 'D', 'E'];
  const major = ['BA', 'CS', 'OE', 'EE', 'SD', 'SS'];

  // TODO:
  const onSubmit = async (data: any) => {
    const convertedData = {
      name: data.name,
      gender: Number(data.gender),
      // gre: data.gre || -1,
      univ: getUniversityCategory(data.university),
      greV: data.greV || -1,
      greQ: data.greQ || -1,
      greA: data.greA || -1,
      gpa: handleGPA(data.gpa, data.gpaSystem),
      toefl: data.toeflScore || -1,
      research: (Number(data.paper1) + Number(data.paper2) + Number(data.paper3)) || -1,
      intern: (Number(data.relatedIntern1) + Number(data.relatedIntern2) + Number(data.relatedIntern3)) || -1,

      // relatedIntern1: Number(data.relatedIntern1) || -1,
      // relatedIntern2: Number(data.relatedIntern2) || -1,
      // relatedIntern3: Number(data.relatedIntern3) || -1,
      // unrelatedIntern1: Number(data.unrelatedIntern1) || -1,
      // unrelatedIntern2: Number(data.unrelatedIntern2) || -1,
      // unrelatedIntern3: Number(data.unrelatedIntern3) || -1,
      target_univ: data.targetSchool,
      major: data.targetMajor,
      // targetMajor: handleUniversity(data.targetMajor), //TODO:
      // isUS: handleUS(data.targetSchool),
    };
    console.log('convertedData', convertedData);

    try {
      fetch('http://127.0.0.1:5000/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(convertedData),
      })
        .then(response => response.json())
        .then(
          data => {
            const rate = data['message'];
            // method 2
            // console.log('data', data['message']);
            // dispatch(receiveEvaluationResult(rate));
            // sessionStorage.setItem('result', rate);
            // router.push('/admission-rate/result');
            // method 1
            router.push(`/admission-rate/result?rate=${rate}`)
          })
        .catch(error => console.error('Error fetching data:', error));
    } catch (error) {
      console.log(error);
    }
  };
  
  // TODO: 解耦
  const handleGPA = (val: any, gpaSystem: any) => (val / gpaSystem)
  const handleScore = (ieltsScore:any, toeflScore:any) => {
    ieltsScore = ieltsScore || -1
    toeflScore = toeflScore || -1

    // const toeflMap = {
    //   '118-120': 9,
    //   '115-117': 8.5,
    //   '110-114': 8,
    //   '102-109': 7.5,
    //   '94-101': 7,
    //   '79-93': 6.5, 
    //   '60-78': 6,
    //   '46-59': 5.5,
    //   '35-45': 5,
    //   '32-34': 4.5,
    //   '0-31': 0,
    //   '-1':-1,
    // };

    const ieltsMap = {
      '9': generateRandomNumber('118-120'),
      '8.5': generateRandomNumber('115-117'),
      '8': generateRandomNumber('102-109'),
      '7.5': generateRandomNumber('94-101'),
      '7': generateRandomNumber('79-93'),
      '6.5': generateRandomNumber('60-78'),
      '6': generateRandomNumber('46-59'),
      '5.5': generateRandomNumber('35-45'),
      '5': generateRandomNumber('32-34'),
      '4.5': generateRandomNumber('0-31'),
    };

    ieltsScore = ieltsMap[ieltsScore];
    // for (let scoreRange in ieltsMap) {
    //   const [min, max] = scoreRange.split('-').map(Number);
    //   if (toeflScore >= min && toeflScore <= max) {
    //     toeflScore = toeflMap[scoreRange];
    //     break;
    //   }
    // }

    return Math.max(ieltsScore, toeflScore)
  }
  const handleUniversity = (university: string) => {
      // 移除括号及其内容
      let result = university.replace(/\(.*?\)/g, '');
      // 移除空格
      result = result.replace(/\s+/g, '');
      return result;
  };
  const handleUS = (university: string) => {
    if (us_university.includes(university)) {
      return true
    }
    return false
  }

  const handleButtonClick = (menu: string) => {
    router.push(menu);
    dispatch(receiveEvaluationResult(100)); // TODO:
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
              id="name"
              type="text"
              label="name"
              fullWidth
              autoComplete="given-name"
              error={Boolean(errors.name)}
              // value={name}
              // onChange={(e: any) => setName(e.target.value)}
              {...register("name")}
            />
          </Grid>

          
          {/* Gender */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                labelId="gender"
                id="demo-simple-select"
                // value={gender}
                label="Gender"
                // onChange={(e: any) => setGender(e.target.value)}
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
                // onChange={(e: any) => setUndergradSchool(e.target.value)}
                {...register('university')}
              >
                {universities.map(school => (
                  <MenuItem key={school} value={school}>{school}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* GRE Score */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="GRE Analytical Writing"
                // value={greScore}
                // onChange={(e: any) => setGreScore(e.target.value)}
                {...register("greA")}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="GRE Quantitative"
                // value={greScore}
                // onChange={(e: any) => setGreScore(e.target.value)}
                {...register("greQ")}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="GRE Verbal"
                // value={greScore}
                // onChange={(e: any) => setGreScore(e.target.value)}
                {...register("greV")}
              />
            </FormControl>
          </Grid>

          {/* IELTS Score */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="IELTS Score"
                // value={ieltsScore}
                // onChange={(e: any) => setIeltsScore(e.target.value)}
                {...register("ieltsScore")}
              />
            </FormControl>
          </Grid>

          {/* TOEFL Score */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                required
                label="TOEFL Score"
                // value={toeflScore}
                // onChange={(e: any) => setToeflScore(e.target.value)}
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
                // onChange={(e: any) => setGpaSystem(e.target.value)}
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
                // onChange={(e: any) => setUndergradGPA(e.target.value)}
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
                {companies.map(company => (
                    <MenuItem key={company} value={company}>{company}</MenuItem>
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
                {companies.map(company => (
                  <MenuItem key={company} value={company}>{company}</MenuItem>
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
                {companies.map(company => (
                  <MenuItem key={company} value={company}>{company}</MenuItem>
                ))}
                <MenuItem value="2">Other</MenuItem>
                <MenuItem value="-1">None</MenuItem>
                </Select>
              </FormControl>
          </Grid>

          {/* Projects
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
          </Grid> */}
          
          {/* Publications */}
          <Grid item xs={4}>
            <FormControl fullWidth>
            <InputLabel>Paper1</InputLabel>
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
            <InputLabel>Paper2</InputLabel>
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
            <InputLabel>Paper3</InputLabel>
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

          {/* Target School */}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="targetSchool">Target School</InputLabel>
              <Select
                label="Target School"
                {...register('targetSchool')}
              >
                {target_uni.map(school => (
                  <MenuItem key={school} value={school}>{school}</MenuItem>
                ))}  
              </Select> 
            </FormControl>
          </Grid>

          {/* Target Major */}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="targetSchool">Target Major</InputLabel>
                <Select
                  label="Target School"
                  {...register('targetMajor')}
                >
                  {major.map(major => (
                    <MenuItem key={major} value={major}>{major}</MenuItem>
                  ))}  
                </Select>
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
          // onClick={() => handleButtonClick("/admission-rate/result")} // TODO: TEST-> DELETE
        >
          Submit
        </Button>
      </form>
    </Box>
  )
};

export default EvaluationForm;
