import * as React from 'react'

import clsx from 'clsx'
import { Container, Box, Grid } from '@material-ui/core'

import { useAuth } from 'client/features/Auth'
import { useProvisionApi, useProviderApi } from 'client/features/One'
import * as Widgets from 'client/components/Widgets'
import dashboardStyles from 'client/containers/Dashboard/Provision/styles'

function Dashboard () {
  const { settings: { disableanimations } = {} } = useAuth()
  const { getProvisions } = useProvisionApi()
  const { getProviders } = useProviderApi()

  const classes = dashboardStyles({ disableanimations })

  React.useEffect(() => {
    getProviders()
    getProvisions()
  }, [])

  const withoutAnimations = String(disableanimations).toUpperCase() === 'YES'

  return (
    <Container
      disableGutters
      className={clsx({ [classes.withoutAnimations]: withoutAnimations })}
    >
      <Box py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Widgets.TotalProvisionInfrastructures />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Widgets.TotalProviders />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Widgets.TotalProvisionsByState />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Dashboard
