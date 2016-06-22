import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';
import {
  Card, CardActions, CardHeader, CardMedia, CardTitle, CardText,
} from 'material-ui/Card';
import CategoryChart from 'components/CategoryChart';
import CategoryItem from 'components/CategoryItem';

import 'scss/category-details.scss';


const CategoryDetails = ({ category }) => {
  return (
    <div id="category-details">
      <Card>
        <CardHeader
          title={category.label}
          subtitle="Monthly Expenses"
          actAsExpander
          showExpandableButton
          style={{ marginTop: '3px', fontWeight: 'bold' }}
          subtitleStyle={{ marginTop: '6px', fontWeight: 'normal' }}
          avatar={
            <Avatar
              icon={<i className="material-icons">{category.icon}</i>}
              color="#FFFFFF"
              backgroundColor={category.colour}
            />
          }
        />
        <CardText>
          <CategoryChart category={category} />
        </CardText>

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
