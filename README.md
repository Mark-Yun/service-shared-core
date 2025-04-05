# service-shared-core

공통 GraphQL 스키마, 리졸버, 모델, 유틸 코드 저장소.

## 구성
- `graphql/` : typeDefs, resolvers 자동 통합
- `models/` : MongoDB 모델 정의
- `utils/` : 유틸 함수
- `constants/` : 공통 상수

## 사용법 (예: service-api)
```js
import { typeDefs, resolvers } from 'service-shared-core/graphql';

import { models, utils } from 'service-shared-core';

const UserModel = models.User;
const formatted = utils.date.formatDate(new Date());
```
