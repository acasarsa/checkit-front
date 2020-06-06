import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Icon, Button} from '@material-ui/core'
import { GiPin } from 'react-icons/gi'

const TaskCard = ({text}) => {
    return (
        <Card style={styles.cardContainter} >
            <CardContent style={{textAlign: 'center'}} >
                <Typography
                    
                    gutterBottom>
                        {text}
                        
                </Typography>
            </CardContent>
            <div style={{textAlign: 'right',}}>
                <Button >

                    <GiPin style={{
                        color: 'red',
                    }} />
                </Button>
            </div>
        </Card>
    )
}

const styles = {
    cardContainter: {
        marginBottom: 8,
        backgroundColor: 'lightblue',
        // textAlign: 'center',
    }
}

export default TaskCard
