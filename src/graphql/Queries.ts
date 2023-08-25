/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const GET_COMPANIES_WITH_LAYOUTS = gql`
  query GetCompaniesWithLayouts($userId: Float!) {
    getCompaniesWithLayouts(userId: $userId) {
      id
      name
      layouts {
        id
        name
        description
        preview
        children
        createdAt
        updatedAt
      }
      userId {
        subscriptionId {
          subscriptionStatus
          subscriptionEnd
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($email: String!) {
    getOneUser(email: $email) {
      id
      username
      email
      phone
      createdAt
    }
  }
`;

export const GET_USER_COMPANIES = gql`
  query GetUserCompanies($userId: Float!) {
    getUserCompanies(userId: $userId) {
      id
      name
      siret
      phone
      email
      address
      website
      facebook
      instagram
      twitter
      description
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_TEMPLATES = gql`
  query Query($email: String!) {
    getUserTemplates(email: $email) {
      id
      name
      subject
      createdAt
      updatedAt
      companyId {
        name
      }
    }
  }
`;
