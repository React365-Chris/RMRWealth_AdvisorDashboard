import * as React from "react";
import { useState } from 'react';

import { Link } from "react-router-dom";
import {
  ApprovalsAppbarIcon,
  ArrowSortIcon,
  AudienceIcon,
  Button,
  CustomerHubIcon,
  EditIcon,
  ExclamationTriangleIcon,
  Flex,
  MoleculeIcon,
  VideomailIcon,
} from "@fluentui/react-northstar";
import { mergeStyles } from '@fluentui/react/lib/Styling';

function Navigation() {

  const navStyle = {
    textDecoration: "none",
    marginleft: '0px'
  };

  const logStyle = mergeStyles({
    display: 'block',
    padding: "25px",
  });

  return (
    <div className={logStyle}>
      <Flex gap="gap.small" column>
        <Link style={navStyle} to={"/"}>
          <Button
            fluid
            icon={<MoleculeIcon />}
            content="Dashboard"
            iconPosition="before"
          />
        </Link>
        <Link style={navStyle} to={"/checklog"}>
          <Button
            fluid
            icon={<ApprovalsAppbarIcon />}
            content="Check Log"
            iconPosition="before"
          />
        </Link>
        <Link style={navStyle} to={"/correspondencelog"}>
          <Button
            fluid
            icon={<CustomerHubIcon />}
            content="Correspondence Log"
          />
        </Link>
        <Link style={navStyle} to={"/signatureguarantees"}>
          <Button fluid icon={<EditIcon />} content="Signature Guarantees" />
        </Link>
        <Link style={navStyle} to={"/marketing"}>
          <Button fluid icon={<VideomailIcon />} content="Marketing" />
        </Link>
        <Link style={navStyle} to={"/investments"}>
          <Button fluid icon={<ArrowSortIcon />} content="Investments" />
        </Link>
        <Link style={navStyle} to={"/myrelationships"}>
          <Button fluid icon={<AudienceIcon />} content="My Relationships" />
        </Link>
        <Link style={navStyle} to={"/complaintlog"}>
          <Button
            fluid
            icon={<ExclamationTriangleIcon />}
            content="Complaint Log"
          />
        </Link>
      </Flex>
    </div>
  );
}

export default Navigation;
