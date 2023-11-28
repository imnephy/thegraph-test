import { Meta } from '@shared/meta'
import { useState } from 'react'
import { gql, useQuery } from 'urql'

export const testQuery = gql`
  query ($firstTokens: Int!, $skip: Int!, $orderDirection: String!) {
    payrues(
      first: $firstTokens
      orderBy: block
      skip: $skip
      orderDirection: $orderDirection
    ) {
      id
      contentURI
      createdAtTimestamp
      block
      creator {
        id
      }
    }
    users(first: $firstTokens, skip: $skip) {
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
  const [args, setArguments] = useState({
    firstTokens: 5,
    firstUsers: 5,
    page: 0,
    orderDirection: 'asc',
  })

  const [result, reexecuteQuery] = useQuery({
    query: testQuery,
    variables: {
      firstTokens: args.firstTokens,
      skip: args.page * args.firstTokens,
      orderDirection: args.orderDirection,
    },
  })

  const onOrderDirectionChange = (e: React.SyntheticEvent) => {
    setArguments((previous) => ({
      ...previous,
      orderDirection: (e.target as HTMLSelectElement).value,
    }))
  }

  const onLimitChange = (e: React.SyntheticEvent) => {
    setArguments((previous) => ({
      ...previous,
      firstTokens: Number((e.target as HTMLSelectElement).value),
    }))
  }
  return (
    <>
      <Meta description="Unistory" title="Unistory" />
      <div className="flex justify-center">
        <div className="mr-2 flex flex-col border px-2">
          <div>Order direction</div>
          <select name="firstTokens" id="" onChange={onOrderDirectionChange}>
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
          <div>Limit select</div>
          <select name="firstTokens" id="" onChange={onLimitChange}>
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
          <div className="flex gap-2 [&>button]:grow">
            <button
              type="button"
              disabled={args.page === 0}
              onClick={() =>
                setArguments((previous) => ({
                  ...previous,
                  page: previous.page - 1,
                }))
              }
            >
              {'<'}
            </button>
            <button
              type="button"
              disabled={!!result.data && Object.values(result.data).flat(1).length <= 5}
              onClick={() =>
                setArguments((previous) => ({ ...previous, page: previous.page + 1 }))
              }
            >
              {'>'}
            </button>
          </div>
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
          {/* <div>
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
          </div> */}
        </div>
      </div>
    </>
  )
}
