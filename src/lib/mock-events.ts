import { ImageType } from "@prisma/client";

export const upcomingAndPastEvents = {
  upcoming: [
    {
      createdAt: new Date(),
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      guests: [],
      id: "1",
      images: [
        {
          id: "1",
          key: "image1",
          name: "Image 1",
          url: "https://example.com/image1.jpg",
          type: ImageType.JPG,
          eventId: "event1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      location: "Belgrade, Serbia",
      name: "Hackathon",
      owner: {
        email: "john.doe@example.com",
        emailVerified: new Date(),
        id: "user1",
        image: "https://example.com/profile1.jpg",
        limit: 10,
        name: "John Doe",
      },
      ownerId: "user1",
      updatedAt: new Date(),
    },
    {
      createdAt: new Date(),
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      guests: [],
      id: "2",
      images: [
        {
          id: "2",
          key: "image2",
          name: "Image 2",
          url: "https://example.com/image2.jpg",
          type: ImageType.JPG,
          eventId: "event2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      location: "Cuba",
      name: "Masterclass",
      owner: {
        email: "jane.smith@example.com",
        emailVerified: new Date(),
        id: "user2",
        image: "https://example.com/profile2.jpg",
        limit: 15,
        name: "Jane Smith",
      },
      ownerId: "user2",
      updatedAt: new Date(),
    },
    {
      createdAt: new Date(),
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      guests: [],
      id: "2",
      images: [
        {
          id: "2",
          key: "image2",
          name: "Image 2",
          url: "https://example.com/image2.jpg",
          type: ImageType.JPG,
          eventId: "event2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      location: "New York",
      name: "Math class",
      owner: {
        email: "jane.smith@example.com",
        emailVerified: new Date(),
        id: "user2",
        image: "https://example.com/profile2.jpg",
        limit: 15,
        name: "Jane Smith",
      },
      ownerId: "user2",
      updatedAt: new Date(),
    },
    {
      createdAt: new Date(),
      date: new Date(new Date().setDate(new Date().getDate() + 35)),
      guests: [],
      id: "2",
      images: [
        {
          id: "2",
          key: "image2",
          name: "Image 2",
          url: "https://example.com/image2.jpg",
          type: ImageType.JPG,
          eventId: "event2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      location: "London",
      name: "Brainstorming",
      owner: {
        email: "jane.smith@example.com",
        emailVerified: new Date(),
        id: "user2",
        image: "https://example.com/profile2.jpg",
        limit: 15,
        name: "Jane Smith",
      },
      ownerId: "user2",
      updatedAt: new Date(),
    },
    {
      createdAt: new Date(),
      date: new Date(new Date().setDate(new Date().getDate() + 10)),
      guests: [],
      id: "2",
      images: [
        {
          id: "2",
          key: "image2",
          name: "Image 2",
          url: "https://example.com/image2.jpg",
          type: ImageType.JPG,
          eventId: "event2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      location: "Helsinki",
      name: "Call meeting",
      owner: {
        email: "jane.smith@example.com",
        emailVerified: new Date(),
        id: "user2",
        image: "https://example.com/profile2.jpg",
        limit: 15,
        name: "Jane Smith",
      },
      ownerId: "user2",
      updatedAt: new Date(),
    },
    {
      createdAt: new Date(),
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      guests: [],
      id: "2",
      images: [
        {
          id: "2",
          key: "image2",
          name: "Image 2",
          url: "https://example.com/image2.jpg",
          type: ImageType.JPG,
          eventId: "event2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      location: "Barcelona",
      name: "Barcelona trip",
      owner: {
        email: "jane.smith@example.com",
        emailVerified: new Date(),
        id: "user2",
        image: "https://example.com/profile2.jpg",
        limit: 15,
        name: "Jane Smith",
      },
      ownerId: "user2",
      updatedAt: new Date(),
    },
    {
      createdAt: new Date(),
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      guests: [],
      id: "2",
      images: [
        {
          id: "2",
          key: "image2",
          name: "Image 2",
          url: "https://example.com/image2.jpg",
          type: ImageType.JPG,
          eventId: "event2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      location: "Pague",
      name: "Business Conference",
      owner: {
        email: "jane.smith@example.com",
        emailVerified: new Date(),
        id: "user2",
        image: "https://example.com/profile2.jpg",
        limit: 15,
        name: "Jane Smith",
      },
      ownerId: "user2",
      updatedAt: new Date(),
    },
  ],
  past: [
    {
      createdAt: new Date(),
      date: new Date(new Date().setDate(new Date().getDate() - 5)),
      guests: [],
      id: "2",
      images: [
        {
          id: "2",
          key: "image2",
          name: "Image 2",
          url: "https://example.com/image2.jpg",
          type: ImageType.JPG,
          eventId: "event2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      location: "Vancouver, Canada",
      name: "Masterclass",
      owner: {
        email: "jane.smith@example.com",
        emailVerified: new Date(),
        id: "user2",
        image: "https://example.com/profile2.jpg",
        limit: 15,
        name: "Jane Smith",
      },
      ownerId: "user2",
      updatedAt: new Date(),
    },
    {
      createdAt: new Date(),
      date: new Date(new Date().setDate(new Date().getDate() - 1)),
      guests: [],
      id: "1",
      images: [
        {
          id: "1",
          key: "image1",
          name: "Image 1",
          url: "https://example.com/image1.jpg",
          type: ImageType.JPG,
          eventId: "event1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      location: "Belgrade, Serbia",
      name: "Group Basketball Trening",
      owner: {
        email: "john.doe@example.com",
        emailVerified: new Date(),
        id: "user1",
        image: "https://example.com/profile1.jpg",
        limit: 10,
        name: "John Doe",
      },
      ownerId: "user1",
      updatedAt: new Date(),
    },
    {
      createdAt: new Date(),
      date: new Date(new Date().setDate(new Date().getDate() - 3)),
      guests: [],
      id: "2",
      images: [
        {
          id: "2",
          key: "image2",
          name: "Image 2",
          url: "https://example.com/image2.jpg",
          type: ImageType.JPG,
          eventId: "event2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      location: "Washington, US",
      name: "Math class",
      owner: {
        email: "jane.smith@example.com",
        emailVerified: new Date(),
        id: "user2",
        image: "https://example.com/profile2.jpg",
        limit: 15,
        name: "Jane Smith",
      },
      ownerId: "user2",
      updatedAt: new Date(),
    },
  ],
};
