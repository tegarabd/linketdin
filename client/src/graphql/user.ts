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
      about
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
      followers {
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

export const USER_CONNECT_INVITATION = gql`
  query userConnectInvitations($id: String!) {
    user(id: $id) {
      id
      invitations {
        id
        from {
          id
        }
        to {
          id
        }
        note
        createdAt
      }
    }
  }
`;

export const USER_MIGHT_KNOW = gql`
  query userMightKnow($id: String!) {
    user(id: $id) {
      id
      userMightKnow {
        id
      }
    }
  }
`;

export const USER_NOTIFICATIONS = gql`
  query userNotifications($id: String!) {
    user(id: $id) {
      id
      notifications {
        id
        from {
          id
        }
        to {
          id
        }
        text
        createdAt
      }
    }
  }
`;

export const USER_THREADS = gql`
  query userThreads($id: String!) {
    user(id: $id) {
      id
      threads {
        id
        with {
          id
        }
        user {
          id
        }
        lastMessage {
          id
          sender {
            id
          }
          text
          imageUrl
          createdAt
        }
      }
    }
  }
`;

export const SEARCH_USER = gql`
  query searchUser($query: String!, $limit: Int!, $offset: Int!) {
    searchUser(query: $query, limit: $limit, offset: $offset) {
      id
      email
      firstName
      lastName
      additionalName
      profilePhotoUrl
      headline
      backgroundPhotoUrl
      pronouns
      about
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
      followers {
        id
      }
    }
  }
`;

export const SEARCH_CONNECTED_USER = gql`
  query searchConnectedUser($userId: String!, $query: String!) {
    searchConnectedUser(userId: $userId, query: $query) {
      id
      firstName
      lastName
      additionalName
      profilePhotoUrl
      headline
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

export const UPDATE_USER_BACKGROUND_PHOTO = gql`
  mutation updateBackgroundPhoto($id: ID!, $url: String!) {
    user {
      updateBackgroundPhoto(input: { userId: $id, backgroundPhotoUrl: $url }) {
        id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUser!) {
    user {
      update(input: $input) {
        id
      }
    }
  }
`;

export const VIEW_USER = gql`
  mutation viewUser($viewerId: String!, $viewedUserId: String!) {
    user {
      view(input: { viewerId: $viewerId, viewedUserId: $viewedUserId }) {
        id
      }
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation followUser($input: FollowUser!) {
    user {
      follow(input: $input) {
        id
      }
    }
  }
`;

export const BLOCK_USER = gql`
  mutation blockUser($input: BlockUser!) {
    user {
      block(input: $input) {
        id
      }
    }
  }
`;
