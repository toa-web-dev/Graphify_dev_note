## Graphify dev note

## 목차
- [개요](#개요)
- [배포 링크](#배포-링크)
- [무슨 프로젝트인가요](#무슨-프로젝트인가요)
- [작동 원리](#작동-원리)


## 개요
<img src="https://github.com/toa-web-dev/Graphify_dev_note/assets/85207564/9b6eb21f-d211-4bbc-a7e6-4ff6cce39fb7" width="900" height="100%"/>

- 배포 링크: https://graphify-dev-note.vercel.app/

### 💎기술 스택 

<img src="" width="60" height="60"/>

| Next.js   | React |  D3 |   
| :----: |:----: |:----: |
| <img src="https://github.com/toa-web-dev/Graphify_dev_note/assets/85207564/fdfc0fcc-5185-4879-938f-cf095b670508" width="60" height="60"/> | <img src="https://github.com/toa-web-dev/Graphify_dev_note/assets/85207564/0aa18d3e-4f03-43ec-8d25-677bf5cda86f" width="60" height="60"/> | <img src="https://github.com/toa-web-dev/Graphify_dev_note/assets/85207564/899f01d6-8f9f-4781-97c2-72e0bfd070e2" width="60" height="60"/>


## 무슨 프로젝트인가요
**Graphify dev note**는 여러 문서의 관계를 시각화하는 학습 툴 프로젝트입니다. 학습한 지식을 네트워크 그래프로 시각화하여 추상적인 개념 사이의 연관성을 시각적으로 볼 수 있어 통상의 블로깅 방식이나 폴더 디렉토리 구조에 문서를 저장하는 경우보다 개념을 확인하고 응용하기에 용이합니다.

## 작동 원리 
supabase로 구축한 DB서버에서 응답받은 데이터에서 노드와 간선 데이터를 추출한 뒤, d3 라이브러리를 사용해 네트워크 그래프를 그립니다. 노드를 클릭하면 해당 주제의 게시글을 확인할 수 있으며 본문의 데이터는 데이터베이스에 마크다운 문자열로 저장되어 있으며 unified 생태계의 라이브러리와 플러그인을 사용해 마크다운을 HTML로 변환하여 렌더링합니다.

