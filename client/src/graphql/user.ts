import { gql } from "@apollo/client";

export const USER_PROFILE = gql`
  query userProfile($id: String!) {
    user(id: $id) {
      id
      firstName
      lastName
      additionalName
      profilePhotoUrl
      headline
      backgroundPhotoUrl
      pronouns
      profileViews
      location {
        city
        region
      }
      connections {
        id
      }
    }
  }
`;

export const USER_EXPERIENCES = gql`
  query userExperiences($id: String!) {
    user(id: $id) {
      experiences {
        id
        title
        employmentType
        companyName
        location {
          city
          region
        }
        isActive
        startDate {
          month
          year
        }
        endDate {
          month
          year
        }
        industry
        headline
      }
    }
  }
`;