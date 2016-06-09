import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

import { getHSLBudgetColour } from 'utils/colour.utils';
import { budgetProgressSelector } from 'selectors/budget.selectors';
import ProgressBar from 'components/ProgressBar';

import 'scss/category-progress.scss';


class CategoryProgress extends Component {
  constructor(props) {
    super(props);

    // Our child component, ProgressBar, shouldn't need to know anything about
    // how the month progress affects its colour; it just wants to know how
    // wide it needs to be, and what colour it needs to be.
    //
    // We can't simply pass in a colour directly, though, because the colour
    // depends on React Motion's `width` value.
    //
    // So, we partially-apply our function that returns an HSL colour with the
    // month progress, and let the progress bar invoke it when it needs a colour.
    this.boundBudgetColourFn = getHSLBudgetColour.bind(null, this.props.monthProgress);
  }

  componentWillReceiveProps(nextProps) {
    // If the date has changed, re-bind the HSL budget colour function, so that
    // we calculate colours based on the new date.
    if (this.props.monthProgress !== nextProps.monthProgress) {
      this.boundBudgetColourFn = getHSLBudgetColour.bind(null, this.props.monthProgress);
    }
  }

  componentDidUpdate() {
    // If the label of the category happens to overlap with the month progress
    // indicator, we want to shorten the lines. This cannot be done in a
    // declarative way, as far as I know, so I figure it out with the refs.
    const progressBox = this.monthProgressElem.getBoundingClientRect();
    const nameBox = this.nameElem.getBoundingClientRect();

    if (progressBox.left > nameBox.left && progressBox.right < nameBox.right) {
      this.monthProgressElem.classList.add('contracted');
    } else {
      this.monthProgressElem.classList.remove('contracted');
    }
  }

  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      name, budgetProgress, monthProgress, actions,
    } = this.props;

    return (
      <div className="category-progress" onClick={actions.showAddCost}>
        <div className="budget-name" ref={el => this.nameElem = el}>
          {name}
        </div>

        <ProgressBar
          percentage={budgetProgress}
          backgroundColor={this.boundBudgetColourFn}
        />

        <div
          className="month-progress"
          style={{ left: monthProgress + '%' }}
          ref={el => this.monthProgressElem = el}
        />
      </div>
    );
  }
}

CategoryProgress.propTypes = {
  name: PropTypes.string.isRequired,
  budgetProgress: PropTypes.number.isRequired,
  monthProgress: PropTypes.number.isRequired,
  actions: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  // Find this category in the list
  const category = state.budget
    .get('categories')
    .find(cat => cat.get('slug') === ownProps.slug);

  return {
    name: category.get('name'),
    budgetProgress: budgetProgressSelector(category),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

// Export the component _without_ the Redux bindings,
// for unit testing and storybook prototyping.
export { CategoryProgress };

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProgress);