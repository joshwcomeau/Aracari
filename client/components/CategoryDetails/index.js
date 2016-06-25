import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import {
  Card, CardActions, CardHeader, CardMedia, CardTitle, CardText,
} from 'material-ui/Card';
import CategoryItem from 'components/CategoryItem';

import { formatCurrency } from 'utils/money.utils';
import {
  availableSelector,
  isProratedSelector,
  usableLimitSelector,
} from 'selectors/budget.selectors';
import { openDrawer } from 'ducks/drawer.duck';
import { EDIT_CATEGORY_DRAWER } from 'constants';
import 'scss/category-details.scss';


const CategoryDetails = props => {
  // eslint-disable-next-line no-unused-vars
  const { actions, routeParams, ...category } = props;
  const {
    label, slug, icon, colour, limit, items, available, usableLimit, isProrated,
  } = category;

  return (
    <div id="category-details">
      <Card style={{ marginBottom: '16px' }}>
        <CardHeader
          title={label}
          subtitle="Category Details"
          style={{ marginTop: '3px', fontWeight: 'bold' }}
          subtitleStyle={{ marginTop: '6px', fontWeight: 'normal' }}
          avatar={
            <Avatar
              icon={<i className="material-icons">{icon}</i>}
              color="#FFFFFF"
              backgroundColor={colour}
            />
          }
        >
          <IconButton
            className="category-edit-button"
            onTouchTap={() => (
              actions.openDrawer(EDIT_CATEGORY_DRAWER, { slug: category.slug })
            )}
          >
            <i className="material-icons">settings</i>
          </IconButton>
        </CardHeader>
        <CardText>
          <div className="flex-row centered with-border category-summary">
            <div className="one-half">
              <h3>Monthly Budget</h3>
              <h5>{formatCurrency(usableLimit)}</h5>
              {
                isProrated ? (
                  <h6 className="prorated">
                    (Prorated from {formatCurrency(limit)})
                  </h6>
                ) : null
              }
            </div>
            <div className="one-half">
              <h3>Amount Remaining</h3>
              <h5>{formatCurrency(available)}</h5>
            </div>
          </div>
        </CardText>
      </Card>

      <Card style={{ marginBottom: '16px' }} className="category-expenses-card">
        <CardHeader
          title="Monthly Expenses"
          actAsExpander
          showExpandableButton
          style={{ fontWeight: 'bold' }}
        />
        <CardText>
          <FlipMove
            enterAnimation="accordionVertical"
            leaveAnimation="accordionVertical"
          >
            {
              items.map(item => (
                <CategoryItem key={item.id} item={item} categorySlug={slug} />
              ))
            }
          </FlipMove>
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
  actions: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const slug = ownProps.routeParams.category;
  const category = state.budget.categories.find(cat => cat.slug === slug);

  return {
    ...category,
    isProrated: isProratedSelector(category),
    usableLimit: usableLimitSelector(category),
    available: availableSelector(category),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      openDrawer,
    }, dispatch),
  };
}

// Export the component _without_ the Redux bindings,
// for unit testing and storybook prototyping.
export { CategoryDetails };

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetails);
