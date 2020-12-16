import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import './trip.css'
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }),
  );

export function Trip(props) {
    let start = moment(props.start).format("YYYY-MM-DD HH:mm:ss")
    console.log(start)
    const classes = useStyles();
    let newDestination="";
    let newComment="";
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const ChangeDestination = (event) =>{
        newDestination= event.target.value;
    }
    const ChangeComment = (event) =>{
        newComment= event.target.value;
    }
    const Submit = () =>{
        
        let jsonobhect={
            "id" : props.id,
            "destination": newDestination ,
            "start": props.start,
            "duration": props.duration,
            "comment": newComment,
            "color" : props.color

     
        }
        console.log(jsonobhect);
        props.editTripAction(jsonobhect);
    }
  
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
      };

    const body = (
        <div  style={modalStyle} className={classes.paper}>
            <TextField id="outlined-basic" onChange={ChangeDestination} label="Change Destination" variant="outlined" style={{margin:"3px"}} />
            <TextField id="outlined-basic" onChange={ ChangeComment} label="Change Comment" variant="outlined" style={{margin:"3px"}}/>
            <Button size="large" onClick={Submit} style={{backgroundColor:" #cccccc"}} >Submit</Button>
        </div>
      );

    return (
        <Card className="card-body">
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.dest}
                </Typography>
                <br/>
                <Typography variant="body2" component="p">
                    Started on {start}
                    <br/>
                    Duration: {props.duration} days
                </Typography>
                <br/>
                <Typography  color="textSecondary">
                    <FormatQuoteIcon/>{props.comment}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={ () => props.deleteTripAction(props.id) } ><DeleteRoundedIcon /></Button>
                <Button size="small" onClick={handleOpen} style={{backgroundColor:" #cccccc"}} >Edit</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                     {body}
                </Modal>
            </CardActions>
        </Card>
    );
}