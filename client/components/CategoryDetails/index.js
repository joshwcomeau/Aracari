import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import {
  Card, CardActions, CardHeader, CardMedia, CardTitle, CardText,
} from 'material-ui/Card';
import CategoryChart from 'components/CategoryChart';
import CategoryItem from 'components/CategoryItem';

import { formatCurrency } from 'utils/currency.utils';
import 'scss/category-details.scss';


const CategoryDetails = ({ category }) => {
  return (
    <div id="category-details">
      <Card style={{ marginBottom: '16px' }}>
        <CardHeader
          title={category.label}
          subtitle="Category Details"
          style={{ marginTop: '3px', fontWeight: 'bold' }}
          subtitleStyle={{ marginTop: '6px', fontWeight: 'normal' }}
          avatar={
            <Avatar
              icon={<i className="material-icons">{category.icon}</i>}
              color="#FFFFFF"
              backgroundColor={category.colour}
            />
          }
        >
          <IconButton className="category-edit-button">
            <i className="material-icons">settings</i>
          </IconButton>
        </CardHeader>
        <CardText>
          <div className="flex-row centered with-border category-summary">
            <div className="one-half">
              <h3>Monthly Budget</h3>
              <h5>{formatCurrency(category.limit)}</h5>
            </div>
            <div className="one-half">
              <h3>Amount Remaining</h3>
              <h5>{formatCurrency(category.limit)}</h5>
            </div>
          </div>
        </CardText>
      </Card>

      <Card>
        <CardHeader
          title="Monthly Expenses"
          actAsExpander
          showExpandableButton
          style={{ fontWeight: 'bold' }}
        />
        <CardText>
          {
            category.items.map(item => (
              <CategoryItem key={item.id} item={item} category={category} />
            ))
          }
        </CardText>

      </Card>
    </div>
  );
};

CategoryDetails.propTypes = {
  routeParams: PropTypes.shape({
    category: PropTypes.string,
  }),
  category: PropTypes.shape({
    slug: PropTypes.string,
    label: PropTypes.string,
    limit: PropTypes.number,
    icon: PropTypes.string,
    colour: PropTypes.string,
    items: PropTypes.array,
  }),
};

function mapStateToProps(state, ownProps) {
  const slug = ownProps.routeParams.category;
  const category = state.budget.categories.find(cat => cat.slug === slug);

  return { category };
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
