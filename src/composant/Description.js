import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import spec from '../spec.json';

function Description() {
  return (
    <div>
      <SwaggerUI spec={spec} />
    </div>
  );
}

export default Description;
