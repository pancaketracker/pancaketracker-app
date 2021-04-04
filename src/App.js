import './App.css';
import React, { useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container, Header, List, Segment } from 'semantic-ui-react';

function App() {
  const [tokens, setTokens] = useState([])
  const [updatedDate, setUpdatedAt] = useState();
  useEffect(() => {
    fetch('https://api.pancakeswap.info/api/tokens').then((data) => {
      return data.json()
    }).then(jsonData => {
      const { updatedAt } = jsonData;
      setUpdatedAt(Date(updatedAt));
      setTokens(jsonData.data);
      console.log(jsonData.data)
    })
  }, [])
  return (
    <Container>
      <Segment>
        <Header>
          Update at {updatedDate}
        </Header>
      </Segment>
      <Segment>
        <List divided relaxed>
          {Object.keys(tokens).map(token => {
            return (
              <List.Item>
                <List.Icon size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a' href={`https://bscscan.com/address/${token}`}>{tokens[token].name}</List.Header>
                  <List.Description as='a'>{token}</List.Description>
                  <List.Content floated='right'>
                    {Number(tokens[token].price).toFixed(10)}$
                  </List.Content>
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      </Segment>
    </Container>
  );
}

export default App;
