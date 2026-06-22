import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { getPersonSchema, getWebSiteSchema, getWebApplicationSchema } from '../../utils/schema';

const SchemaMarkup = ({ schemas = [] }) => {
  const defaultSchemas = [getPersonSchema(), getWebSiteSchema(), getWebApplicationSchema()];
  const allSchemas = schemas.length > 0 ? schemas : defaultSchemas;

  return (
    <Helmet>
      {allSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

SchemaMarkup.propTypes = {
  schemas: PropTypes.arrayOf(PropTypes.object),
};

export default SchemaMarkup;
