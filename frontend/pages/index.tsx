import type { NextPage } from 'next'
import { useEffect, useState} from 'react';
import { Amplify, API } from 'aws-amplify';
import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

import config from '../../amplifyconfiguration';

export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTodos(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        createdAt
        description
        id
        name
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;


Amplify.configure(config);

function TodoList() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    async function fetchTodos() {
      const data = await API.graphql({
        query: listTodos, 
        variables: {
          input: {
    
          }
        }
      });
      setData(data)
    }
    fetchTodos();
  }, []);

return (
  <pre>{JSON.stringify(data, null, 2)}</pre>
)
}
 

const Home: NextPage = ({ data }) => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello, {user?.username}!</h1>
          <button onClick={signOut}>Sign out</button>
          <TodoList />
        </main>
      )}
    </Authenticator>
  )
}

export default Home
