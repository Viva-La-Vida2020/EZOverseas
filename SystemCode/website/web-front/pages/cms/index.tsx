import { DataGrid, GridToolbar, GridCellParams, MuiEvent, GridCallbackDetails } from "@mui/x-data-grid";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
// import { useDemoData } from '@mui/x-data-grid-generator';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../store";

let rows: GridRowsProp = [];

const columns: GridColDef[] = [
  { field: "fullName", headerName: "姓名", width: 100 },
  { field: "sex", 
    headerName: "性别", 
    valueFormatter: ({ value }) => {
      switch (value) {
        case 0:
          return ('未知')
        case 1:
          return '男'
        case 2:
          return '女'
      }       
    },
    width: 100 },
  { field: "phone", headerName: "手机号", width: 200 },
  { field: "latestTime", headerName: "最新测试时间(查看详情)", width: 200 },
  { field: "studyAboard", headerName: "测试目的", width: 200 },
  { field: "age", headerName: "年龄", width: 100 },
  { field: "knewSuitntieBy", headerName: "来源", width: 150 },
  { field: "ip", headerName: "IP地址", width: 150 },
  // { field: 'importance', headerName: '重要程度', width: 100, editable: true },
  // { field: 'note', headerName: '备注', width: 100, editable: true},
  // { field: 'follower', headerName: '跟进人', width: 100, editable: true },
  {
    field: "mbtiResult",
    headerName: "mbti",
    valueFormatter: ({ value }) => value?.code ?? "",
    width: 100,
  },
  { field: "hollandResult", 
    headerName: "holland", 
    valueFormatter: ({ value }) => value?.code ?? "",
    width: 100 
  },
];

export default function ExportDefaultToolbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  let response: any = useSelector((state: RootState) => state.user.allUsers);
  let tem = JSON.parse(JSON.stringify(response));
  // let tem: any = JSON.parse(response ?? null)
  tem?.forEach((user: any) => {
    if (user?.mbtiResult && user?.hollandResult) {
      user['latestTime'] = user?.mbtiResult?.date >= user.hollandResult?.date ? 
      user?.mbtiResult?.date.slice(0, user?.mbtiResult?.date.length - 5) : user?.hollandResult?.date.slice(0, user?.hollandResult?.date.length - 5)
    }
    else if (user?.mbtiResult) {
      user['latestTime'] = user?.mbtiResult?.date.slice(0, user?.mbtiResult?.date.length - 5) ?? ''
    }
    else if (user?.hollandResult) {
      user['latestTime'] = user?.hollandResult?.date.slice(0, user?.hollandResult?.date.length - 5)
    }
    else user['latestTime'] = ''
  })
  rows = tem;
  // rows = response ? response.filter((user: any) => (user.fullName && user.phone && user.mbtiResult && user.hollandResult)) : [];
  // console.log("response:", response);
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch({ type: "FETCH_ALL_USERS" });
    }
    // dispatch({ type: "FETCH_ALL_USERS" });
    // console.log("fetch_all_user");
  }, []);
  
  const handleEvent = (
    params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails
  ) => {
    // console.log('params: ',params)
    if (params.field == 'latestTime') {
      router.push(`/user-dashboard/${params.id}`)
    }
  }  

  return (
    <div style={{ height: 800, width: "100%" }}>
      {rows ? (
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onCellClick={handleEvent}
          />
      ) : (
        <div style={{ textAlign: "center", paddingTop: 200 }}>
          数据加载中...
        </div>
      )}
    </div>
  );
}
