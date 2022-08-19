import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'grid',
      height: '100%',
      width: '100vw',

      gridTemplate: `
          "header" auto
          "content" 1fr
          / auto 
        `,
    },
  }),
  { name: 'TwoSum' }
)

const TwoSum = props => {
  const classes = useStyles(props)

  const solve = (nums = [], target) => {
    const hash = {}
    for (let i = 0; i < nums.length; i++) {
      hash[nums[i]] = i
    }

    for (let i = 0; i < nums.length; i++) {
      let complement = target - nums[i]
      if (complement in hash && hash[complement] !== i) {
        return [i, hash[complement]]
      }
    }
  }

  return (
    <div className={classes.root}>
      TWO SUM
      {JSON.stringify(solve([2, 7, 11, 15], 9), null, 2)}
    </div>
  )
}

export default TwoSum
