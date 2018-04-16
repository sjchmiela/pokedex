// @flow

// STEP 18
// Implement enforceUnauthenticated in the same manner as enforceAuthenticated
// Just change `maybeRedirect` to redirect when this.props.me is truthy and
// redirect to `/`.

export function enforceUnauthenticated(component) {
  return component;
}
