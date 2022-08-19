/**
 * https://leetcode.com/problems/two-sum/solution/
 */
import { useState, useCallback, useReducer, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet-async'
import capitalize from 'capitalize'

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'grid',
      height: '100%',
      width: '100vw',

      gridTemplate: `
          "content" auto
          / auto 
        `,
    },

    content: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },

    historyItem: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      border: '1px solid black',
      width: '100%',
    },

    historyIteration: {
      // flex: 1,
      padding: theme.spacing(2),
    },

    historyItemValue: {
      flex: 1,
      padding: theme.spacing(2),
      width: '100%',
    },

    // History State Objects
    historyKeyItem: {
      display: 'flex',
      flex: 1,
    },

    historyKeyKey: {
      flex: 1,
    },

    historyKeyValue: {
      flex: 5,
    },

    table: {
      border: `1px solid black`,
    },

    td: {
      border: `1px solid black`,
    },
  }),
  { name: 'TwoSumTwoPassHashTable' }
)

// const solution = (nums = [], target) => {
//   const hash = {}
//   for (let i = 0; i < nums.length; i++) {
//     hash[nums[i]] = i
//   }

//   for (let i = 0; i < nums.length; i++) {
//     let complement = target - nums[i]
//     if (complement in hash && hash[complement] !== i) {
//       return [i, hash[complement]]
//     }
//   }
// }

// Reducer
const initialState = {
  dirty: true,
  nums: [2, 7, 11, 15],
  target: 9,
  hash: {},
  complement: 0,
  ticks: 0,
  ms: 1000,
  i: 0,
  j: 0,
  solution: [],
  page: window.location.pathname.split('/').pop(),
}

const ACTIONS = {
  SET_STATE: 'SET_STATE',
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_STATE:
      return {
        ...state,
        ...action.payload,
      }

    default:
      console.error(`Invalid reducer action type: ${action.type}`)
  }
}

const TwoSumTwoPassHashTable = props => {
  const classes = useStyles(props)
  const [state, dispatch] = useReducer(reducer, initialState)

  const [history, setHistory] = useState([])

  useEffect(() => {
    const path = window.location.pathname
    const page = path.split('/').pop()
    console.log(page)
    dispatch({ type: ACTIONS.SET_STATE, payload: { page } })
  }, [])

  const timer = useCallback(() => {
    // if (state.ticks < 10) {
    //   console.log(JSON.stringify(state, null, 2))
    //   dispatch({ type: ACTIONS.SET_STATE, payload: { ticks: state.ticks + 1 } })
    // }

    const isSolutionReady = complement => {
      console.log(`READY CHECK: ` + JSON.stringify(state, null, 2))
      const ready = complement in state.hash && state.hash[complement] !== state.j
      console.log(`READY CHECK RESULT: ${ready}`)
      return ready
    }

    if (state.i < state.nums.length) {
      setHistory([...history, { ...state }])
      console.log('FIRST LOOP: ' + JSON.stringify(state, null, 2))
      const index = state.nums[state.i]
      const newHash = { ...state.hash, [index]: state.i }

      dispatch({ type: ACTIONS.SET_STATE, payload: { hash: { ...newHash }, i: state.i + 1 } })
    }

    if (state.i === state.nums.length && state.j < state.nums.length) {
      setHistory([...history, { ...state }])
      console.log('SECOND LOOP: ' + JSON.stringify(state, null, 2))

      const newComplement = state.target - state.nums[state.j]

      let solution = []
      if (isSolutionReady(newComplement) && state.solution.length === 0) {
        console.log(`SOLUTION READY! ...`)
        solution = [state.j, state.hash[newComplement]]
        console.warn(`SOLUTION IS: ` + JSON.stringify(solution, null, 2))

        dispatch({ type: ACTIONS.SET_STATE, payload: { solution: [...solution] } })
      }

      const payload = {
        j: state.j + 1,
        complement: newComplement,
      }

      dispatch({ type: ACTIONS.SET_STATE, payload: { ...payload } })
    }
  }, [state, history])

  useEffect(() => {
    const timeout = setTimeout(timer, 500)

    // Make sure to clear the current timeout whenever a new timer is generated.
    // This ensures that only one timeout is active at a time.
    return () => clearTimeout(timeout)
  }, [timer])

  const renderObject = (key, object, index) => {
    const keys = Object.keys(object)
    return (
      <div className={classes.historyKeyItem}>
        <div className={classes.historyKeyKey}>{key}</div>
        <div className={classes.historyKeyValue}>
          {Array.isArray(object) ? (
            <table key={index} className={classes.table}>
              <tr>
                {object.map((item, index) => {
                  return <td className={classes.td}>{item}</td>
                })}
              </tr>
            </table>
          ) : (
            <table key={index} className={classes.table}>
              <tr>
                {keys.map((key, index) => {
                  return <td className={classes.td}>{key}</td>
                })}
              </tr>
              <tr>
                {keys.map((key, index) => {
                  const value = object[key]
                  return <td className={classes.td}>{value}</td>
                })}
              </tr>
            </table>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <Helmet>
        <title>{capitalize.words(state.page.replaceAll('-', ' '))}</title>
      </Helmet>
      <div className={classes.content}>
        {/* {JSON.stringify(solve([2, 7, 11, 15], 9), null, 2)} */}
        {/* <pre>{JSON.stringify(state.solution, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(history, null, 2)}</pre> */}
        <div>{history.length}</div>
        <div>
          {history.map((hash, index) => {
            const keys = Object.keys(hash)
            console.log(`HISTORY RENDER KEYS: `, keys)
            // return <div>{keys}</div>
            return (
              <table className={classes.historyItem}>
                <tr>
                  <td className={classes.historyIteration}>{index}</td>
                  <td className={classes.historyItemValue}>
                    {keys.map((key, keyIndex) => {
                      console.log(`HISTORY RENDER KEY: `, key)
                      console.log(`HISTORY RENDER TYPEOF HASH KEY: `, typeof hash[key])
                      if (typeof hash[key] === 'object') {
                        return renderObject(key, hash[key], index)
                        // return <div>{key}</div>
                      } else {
                        return <></>
                      }
                    })}
                  </td>
                </tr>
              </table>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TwoSumTwoPassHashTable
