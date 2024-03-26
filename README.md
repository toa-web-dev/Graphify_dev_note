# Graphify dev note
# 문서 관계 시각화 프로젝트
<br/>

## ❓ 무슨 프로젝트인가요
**Graphify dev note**는 여러 문서의 관계를 시각화하는 학습 툴 프로젝트입니다. 학습한 지식을 **네트워크 그래프**로 나타내어 추상적인 개념 사이의 연관성을 시각적으로 볼 수 있기 때문에, 통상의 블로깅 방식이나 폴더 디렉터리 구조에 문서를 저장하는 경우보다 여러 개념 사이의 관계를 정리하고 학습하는데 유용합니다.

렌더링 속도를 개선하기 위해 `Next.js`로 SSR을 구현하여 성능을 향상했습니다. 

`D3.js` 를 사용해 프로젝트 목적에 적합한 네트워크 그래프를 렌더링하고 이벤트를 적용하여 인터랙션을 적용하였습니다.

`unified` 를 사용해 마크다운으로 작성된 텍스트를 DB에 저장하면, 클라이언트가 노드를 클릭해 게시글 페이지로 이동했을 때, 응답 받은  텍스트를 HTML로 변환하는 과정을 거쳐 페이지에 렌더링합니다.

`Supabase`로 데이터베이스를 구축하여 문서의 카테고리나 연결 대상 같은 여러 데이터를 유지보수하기 쉽게 하였습니다.

프로젝트를 `Vercel`로 배포하여 Github와의 연동으로 자동배포 및 관리하고 있습니다.




### 🔗배포 링크: https://graphify-dev-note.vercel.app/
<img src="https://github.com/toa-web-dev/Graphify_dev_note/assets/85207564/6d5c60fe-6fd6-46cc-9be1-8f8a34643e18" width="750" height="100%"/>

![](https://github.com/toa-web-dev/Graphify_dev_note/assets/85207564/8305b150-11e6-44b2-bc10-c6b3569cb778)

<br/>
<br/>

## 💎기술 스택 

| Next.js | React |  SCSS | D3.js | unified | supabase |
| :----: |:----: |:----: | :----: |:----: |:----: |
| <img src="https://github.com/toa-web-dev/Graphify_dev_note/assets/85207564/fdfc0fcc-5185-4879-938f-cf095b670508" width="60" height="60"/> | <img src="https://github.com/toa-web-dev/Graphify_dev_note/assets/85207564/0aa18d3e-4f03-43ec-8d25-677bf5cda86f" width="60" height="60"/> |  <img src="https://github.com/toa-web-dev/Graphify_dev_note/assets/85207564/db7bfd62-a83d-4869-b117-b9f31f29f110" width="60" height="60"/> |<img src="https://github.com/toa-web-dev/Graphify_dev_note/assets/85207564/899f01d6-8f9f-4781-97c2-72e0bfd070e2" width="60" height="60"/> | <img src="https://github.com/toa-web-dev/Graphify_dev_note/assets/85207564/bc3dba67-c6c5-4185-9970-e100a7d66e72" width="60" height="60"/>| <img src="https://github.com/toa-web-dev/Graphify_dev_note/assets/85207564/350b34d9-94d2-4b07-9aba-902a66d2549d" width="60" height="60"/>
|-|-|-| 그래프 라이브러리 |텍스트처리 라이브러리 |백엔드 DB 구축 |

<!-- <img src="" width="60" height="60"/> -->

<br/>

## 🛠️기능
#### 현재
 - DB에 데이터를 입력하면 클라이언트에서 네트워크 그래프를 렌더링합니다.
 - 네트워크 그래프의 노드는
    - 클릭하면 게시글 문서 페이지로 이동합니다
    - 드래그하여 해당 노드와 연결된 노드를 움직일 수 있습니다.
    - 마우스 휠을 올리면 그래프가 확대되고 내리면 축소됩니다.
    - DB에 등록된 게시글 작성 상태에 따라 완료(초록), 작성 중(노랑), 초안(회색)으로 노드의 색상이 다르게 스타일 됩니다.
 - supabase의 bucket을 사용하여 게시글에 이미지를 첨부 할 수 있습니다.
 - [프로젝트 칸반 보드](https://github.com/users/toa-web-dev/projects/7) 에서 개발 내용을 확인 하실 수 있습니다.

<br/>

## 👷‍♂️작동 원리 
supabase로 구축한 DB서버에서 응답받은 데이터에서 노드와 간선 데이터를 추출한 뒤, d3 라이브러리를 사용해 네트워크 그래프를 그립니다. 노드를 클릭하면 해당 주제의 게시글을 확인할 수 있으며 본문의 데이터는 데이터베이스에 마크다운 문자열로 저장되어 있으며 unified 생태계의 라이브러리와 플러그인을 사용해 마크다운을 HTML로 변환하여 렌더링합니다.

