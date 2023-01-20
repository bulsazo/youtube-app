[![Netlify Status](https://api.netlify.com/api/v1/badges/170bfd9e-858c-41d4-bf11-1a47f894d3a8/deploy-status)](https://app.netlify.com/sites/bulsazotube/deploys)

<br />

# [프로젝트 소개](https://docs.google.com/document/d/1vHlO8lgIo1oXBYiecpE8TbG2tHnr3Hmv25UxK_7a5_g/edit#)

유튜브 API를 활용한 유튜브 클론

## 배포 사이트

[불사조 유튜브](https://bulsazotube.netlify.app/)


# 팀원

<table>
  <tbody>
  <tr>
  <td align="center"><a href="https://github.com/yujiseok">팀장: 유지석</a></td>
  <td align="center"><a href="https://github.com/Jaeheon-So">팀원: 소재헌</a></td>
  <td align="center"><a href="https://github.com/hoheesu">팀원: 윤준수</a></td>
  <td align="center"><a href="https://github.com/jisooround">팀원: 우지수</a></td>
  <td align="center"><a href="https://github.com/1myeji">팀원: 임예지</a></td>
  </tr>
  <tr>
  <td align="center"><a href="https://github.com/yujiseok"><img src="https://avatars.githubusercontent.com/u/83855636?s=400&u=7b00ef50bdc25603c2761b99ce36cad936cbd5cd&v=4" width="150px;" /></a></td>
  <td align="center"><a href="https://github.com/Jaeheon-So"><img src="https://avatars.githubusercontent.com/u/79908684?v=4" width="150px;" /></a></td>
  <td align="center"><a href="https://github.com/hoheesu"><img src="https://avatars.githubusercontent.com/u/99115509?v=4" width="150px;" /></a></td>
  <td align="center"><a href="https://github.com/jisooround"><img src="https://avatars.githubusercontent.com/u/110647022?v=4" width="150px;" /></a></td>
   <td align="center"><a href="https://github.com/1myeji"><img src="https://avatars.githubusercontent.com/u/106291546?v=4" width="150px;" /></a></td>
  </tr>
  </tbody>
</table>

# 🔨기술 스택

<div>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">

<img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"><br /><br />
</div>

# 📆 과제 기간 및 담당 업무

과제 기간: 2023. 1. 16 ~ 2022. 1. 20 <br />

- <b>유지석 :</b> <상세 페이지> 동영상 설명, 댓글<br/>
- <b>소재헌 :</b> <상세 페이지> 동영상 상세 정보 <br />
- <b>윤준수 :</b> <상세 페이지> 관련동영상<br />
- <b>우지수 :</b> <메인 페이지, 사이드바> 메인 페이지 전체, 사이드바<br />
- <b>임예지 :</b> <검색 페이지, 헤더> 검색 페이지 전체, 헤더
  <br/><br/>

# 🎈기능 구현

- 메인 페이지에서는 10개의 고정된 동영상을 보여준다.
- 검색 페이지에서는 검색어에 해당하는 10개의 동영상을 보여준다.(채널은 제외)
- 동영상을 클릭하면 상세 페이지로 이동한다.
- 상세 페이지에서는 해당 동영상의 영상, 정보, 설명, 댓글, 관련동영상을 보여준다.
- 사용자의 컴퓨터 설정에 따른 다크, 라이트 모드를 적용시켰다.
- 검색 페이지와 헤더를 제외한 나머지 부분은 반응형으로 만들었다.
- api 할당량을 초과하면 고정된 더미 데이터를 보여준다.
  <br/><br/>

# 🔔어려웠던 점

- 타입스크립트가 익숙하지 않아서 타입 오류를 해결하는 것이 많이 힘들었다.
- 중복되는 함수들을 합치는 작업이 어려웠다.
- api 호출 할당량이 적어서 실제로 되는지 안되는지 확인하는 것이 힘들었다.
- 반응형 작업이 어려웠다.
  <br/><br/>

# 💡궁금한 점

- api 호출시, 여러 이펙트안에서 분리해서 각각 호출하는 것이 좋은지
- 하나의 이펙트안에서 호출하는 게 좋은지
- 혹은 하나의 이펙트안에서 axios.all을 이용해 처리하는게 좋은지
- 자녀 컴포넌트에서 각자 api 호출이 좋은지, 부모 컴포넌트에서 호출을 한 후 prop으로 내리는 게 좋을지
- 더미데이터를 useState의 기본값에 할당을 해주어서 처음 렌더링 할때 더미데이터 값이 먼저 렌더링 되고 그 다음에 api에서 받아온 값이 렌더링 되는데 고칠 수 있는 방법이 있는지



