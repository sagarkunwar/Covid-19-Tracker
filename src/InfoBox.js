import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

function InfoBox({ title, cases, total }) {
  return (
    <Card>
      <CardContent>
        {/* title */}
        <Typography color="textSecondary">{title}</Typography>

        {/* current cases */}
        <h2 className="InfoBox_cases">
          <strong>+{cases}</strong>
        </h2>

        {/* total cases */}
        <Typography color="textSecondary">Total Cases: {total} </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
