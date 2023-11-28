import { Meta } from '@shared/meta'
import { useState } from 'react'
import { gql, useQuery } from 'urql'

export const testQuery = gql`
  query ($firstTokens: Int!, $firstUsers: Int!) {
    payrues(first: $firstTokens) {
      id
      contentURI
      createdAtTimestamp
      block
      creator {
        id
      }
    }
    users(first: $firstUsers) {
      id
      tokens {
        id
      }
      created {
        id
      }
    }
  }
`
export const HomePage = () => {
  const [args, setArguments] = useState({ firstTokens: 10, firstUsers: 5 })
  const [result, reexecuteQuery] = useQuery({
    query: testQuery,
    variables: { firstTokens: args.firstTokens, firstUsers: args.firstUsers },
  })
  console.log(result.data)
  const onSelectTokensChangeHandler = (e: React.SyntheticEvent) => {
    setArguments((previous) => ({
      ...previous,
      firstTokens: Number((e.target as HTMLSelectElement).value),
    }))
  }
  const onSelectUsersChangeHandler = (e: React.SyntheticEvent) => {
    setArguments((previous) => ({
      ...previous,
      firstUsers: Number((e.target as HTMLSelectElement).value),
    }))
  }
  return (
    <>
      <Meta description="Unistory" title="Unistory" />
      <div className="flex justify-center">
        <div className="mr-2 flex flex-col border px-2">
          <div>Tokens select</div>
          <select name="firstTokens" id="" onChange={onSelectTokensChangeHandler}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="100">100</option>
          </select>
          <div>Users select</div>
          <select name="firstUsers" id="" onChange={onSelectUsersChangeHandler}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="100">100</option>
          </select>
          <button
            type="button"
            onClick={reexecuteQuery}
            className="my-4 block bg-gray-500 text-white"
          >
            refresh
          </button>
        </div>
        <div className="flex gap-2">
          <div>
            <div>Tokens table</div>
            <table>
              <thead>
                <tr>
                  <th>token id</th>
                  <th>address</th>
                  <th>block</th>
                </tr>
              </thead>
              <tbody>
                {result?.data?.payrues.map((item: any) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.creator.id}</td>
                      <td>{item.block}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div>
            <div>Users</div>
            <table>
              <thead>
                <tr>
                  <th>address</th>
                  <th>tokens id`s</th>
                </tr>
              </thead>
              <tbody>
                {result?.data?.users.map((item: any) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.created.map((item_: any) => item_.id).join(',')}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
