import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getHSLBudgetColour } from 'utils/colour.utils';
import { budgetProgressSelector } from 'selectors/budget.selectors';
import ProgressBar from 'components/ProgressBar';
import FluidEventHandler from 'components/FluidEventHandler';

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

    this.handleDateIndicatorLines = this.handleDateIndicatorLines.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // If the date has changed, re-bind the HSL budget colour function, so that
    // we calculate colours based on the new date.
    if (this.props.monthProgress !== nextProps.monthProgress) {
      this.boundBudgetColourFn = getHSLBudgetColour.bind(null, this.props.monthProgress);
    }
  }

  handleDateIndicatorLines() {
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
    const { slug, label, budgetProgress, monthProgress } = this.props;

    return (
      <FluidEventHandler
        event="resize"
        handler={this.handleDateIndicatorLines}
        lifecycleMethods={['componentDidMount', 'componentDidUpdate']}
      >
        <Link to={`/category/${slug}`} className="category-progress">
          <div className="budget-label" ref={el => this.nameElem = el}>
            {label}
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
        </Link>
      </FluidEventHandler>
    );
  }
}

CategoryProgress.propTypes = {
  slug: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  budgetProgress: PropTypes.number.isRequired,
  monthProgress: PropTypes.number.isRequired,
};

function mapStateToProps(state, ownProps) {
  // Find this category in the list
  const category = state.budget.categories.find(cat => {
    return cat.slug === ownProps.category;
  });

  return {
    slug: category.slug,
    label: category.label,
    budgetProgress: budgetProgressSelector(category),
  };
}

// Export the component _without_ the Redux bindings,
// for unit testing and storybook prototyping.
export { CategoryProgress };

export default connect(mapStateToProps)(CategoryProgress);
