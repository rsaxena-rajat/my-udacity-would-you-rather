import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {Avatar} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: '100px'
    },
    paper: {
      padding: theme.spacing(1),
      margin: 'auto',
      maxWidth: 600,
    },
    avatar: {
        width: theme.spacing(9),
        height: theme.spacing(9),
        margin: 'auto'
    },
    avatarContainer: {
        marginTop: '5px',
        width: '150px',
        display: 'flex'
    },
    dividerContainer: {
        display: "flex",
        alignItems: "center"
    },
    dividerBorder: {
        borderBottom: "1px solid lightgray",
        width: "100%"
    },
    userText: {
        fontWeight: 'bold',
        fontSize: '150%'
    },
    rankText: {
        fontWeight: 'bold',
        fontSize: '100%'
    },
    scoreTextContainer: {
        marginTop: '30px', 
        marginLeft: '20px', 
        marginRight: '20px', 
        height: '50px',
        textAlign: 'center',
        backgroundColor: '#e0e0e0'
    },
    scoreContainer: {
        marginLeft: '20px', 
        marginRight: '20px', 
        marginTop: 'auto',
        marginBottom: 'auto',
        height: '80px',
        textAlign: 'center'
    },
}));

export default function UserScoreCard (props) {
    const classes = useStyles();
    const {name, answeredCount, askedCount, rank, score, avatarURL} = props
    
    return(
        <Paper className={classes.paper} elevation={3}>
            <Grid container spacing={2} xs={12} item>
                <Grid item sm={3} className={classes.avatarContainer}>
                    <Avatar alt={name} src={avatarURL} className={classes.avatar}/>
                </Grid>
                <Grid item sm={6} container>
                    <Grid item xs container direction="column" spacing={0}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" className={classes.userText}>
                                {name}
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography className={classes.rankText}>
                                Rank: {rank}
                            </Typography>
                        </Grid>
                        <Grid container item>
                            <Grid item xs={12}>
                                    <Typography variant="body2" style={{float: 'left'}}>Answered questions</Typography>
                                    <Typography variant="body2" style={{float: 'right'}}>{answeredCount}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={classes.dividerContainer}>
                                    <div className={classes.dividerBorder} />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                
                                    <Typography variant="body2" style={{float: 'left'}}>Created questions</Typography>
                                    <Typography variant="body2" style={{float: 'right'}}>{askedCount}</Typography>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={3}>
                    <Paper square={true} className={classes.scoreTextContainer}>
                        <Typography style={{paddingTop: '15px', fontWeight: 'bold'}}>Score</Typography>
                    </Paper>
                    <Paper square={true} className={classes.scoreContainer}>
                        <Typography style={{paddingTop: '20px', fontWeight: 'bold', fontSize: '150%'}}>{score}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    )
}