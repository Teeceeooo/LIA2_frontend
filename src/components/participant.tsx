import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

export default function Participant() {
    return (
        <Card sx={{ maxWidth: 500 }}>
          <CardMedia
            sx={{ height: 140 }}
            /* image ska vara satt till inkommande objekts image.. :)  */
            image='https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=2034&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            title="Profile picture"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Hund Hundsson
            </Typography>
            <Typography variant="body2" color="text.secondary">
            
              <ul className="participant-list">
                <li>Ladda item 1......</li>
                <li>Ladda item 2......</li>
                <li>Ladda item 3......</li>
                <li>Ladda item 4......</li>
                <li>Ladda item 5......</li>
              </ul>
            </Typography>
          </CardContent>
          <CardActions>
          <a href="tel:000 000 000"><PhoneAndroidIcon /></a>
          </CardActions>
        </Card>
      );
}