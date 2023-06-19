import { gql } from '@apollo/client';

export const NEW_COMPANY = gql`
mutation Mutation($company: CompanyInput!, $userEmail : String!) {
  createCompany(company: $company, userEmail: $userEmail) {
    id
    name
    layouts {
      id
      name
      children
      createdAt
      updatedAt
    }
  }
}
`;

export const NEW_LAYOUT = gql`
mutation Mutation($layout: LayoutInput!, $companyId: Float!) {
  newLayout(layout: $layout, companyId: $companyId) {
    id
    name
    preview
    children
    createdAt
    updatedAt
  }
}
`;

export const UPDATE_USER = gql`
mutation Mutation($id: Float!, $username: String!, $phone: String!) {
  updateUser(id: $id, username: $username, phone: $phone) {
    id
    username
    email
    phone
    createdAt
  }
}`;
