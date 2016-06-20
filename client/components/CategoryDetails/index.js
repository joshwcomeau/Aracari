import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { costPointsSelector } from 'selectors/budget.selectors';
import categories from 'data/categories';
import Avatar from 'material-ui/Avatar';
import {
  Card, CardActions, CardHeader, CardMedia, CardTitle, CardText,
} from 'material-ui/Card';
import 'scss/category-details.scss';


const CategoryDetails = ({ routeParams, items }) => {
  const categoryData = categories[routeParams.category] || categories.custom;

  return (
    <div id="category-details">
      <Card>
        <CardHeader
          title={categoryData.label}
          subtitle="Monthly Expenses"
          actAsExpander
          showExpandableButton
          avatar={
            <Avatar
              icon={<i className="material-icons">{categoryData.icon}</i>}
              color="#FFFFFF"
              backgroundColor={categoryData.colour}
            />
          }
        />
        <CardText>
          Graph here!
        </CardText>

      </Card>
    </div>
  );
};

CategoryDetails.propTypes = {
  routeParams: PropTypes.shape({
    category: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.object),
};

function mapStateToProps(state, ownProps) {
  const slug = ownProps.routeParams.category;
  const category = state.budget.categories.find(cat => cat.slug === slug);

  return {
    items: costPointsSelector(category),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

// Export the component _without_ the Redux bindings,
// for unit testing and storybook prototyping.
export { CategoryDetails };

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetails);
