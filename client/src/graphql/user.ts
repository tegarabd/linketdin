import { gql } from "@apollo/client";

export const USER_PROFILE = gql`
  query userProfile($id: String!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
      additionalName
      profilePhotoUrl
      headline
      backgroundPhotoUrl
      pronouns
      profileViews {
        id
      }
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
      id
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

export const USER_EDUCATIONS = gql`
  query userEducations($id: String!) {
    user(id: $id) {
      id
      educations {
        id
        school
        degree
        field
        startDate {
          month
          year
        }
        endDate {
          month
          year
        }
        grade
        activities
        description
      }
    }
  }
`;

export const USER_BLOCKED = gql`
  query userBlocked($id: String!) {
    user(id: $id) {
      id
      blocked {
        id
      }
    }
  }
`;

export const UPDATE_USER_PROFILE_PHOTO = gql`
  mutation updateProfilePhoto($id: ID!, $url: String!) {
    user {
      updateProfilePhoto(input: { userId: $id, profilePhotoUrl: $url }) {
        id
      }
    }
  }
`;
