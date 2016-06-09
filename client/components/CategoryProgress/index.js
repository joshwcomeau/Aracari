import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

import { getHSLBudgetColour } from 'utils/colour.utils';
import { budgetRatioSelector } from 'selectors/budget.selectors';

import 'scss/category-progress.scss';


class CategoryProgress extends Component {
  componentDidUpdate() {
    // If the label of the category happens to overlap with the month progress
    // indicator, we want to shorten the lines. This cannot be done in a
    // declarative way, as far as I know, so I figure it out with the refs.
    const progressBox = this.monthProgress.getBoundingClientRect();
    const nameBox = this.name.getBoundingClientRect();

    if (progressBox.left > nameBox.left && progressBox.right < nameBox.right) {
      this.monthProgress.classList.add('contracted');
    } else {
      this.monthProgress.classList.remove('contracted');
    }
  }

  renderBudgetProgressWithMotion({ width }) {
    const budgetColour = getHSLBudgetColour(width, this.props.monthProgress * 100);

    return (
      <div
        className="budget-progress"
        style={{
          width: `${width}%`,
          backgroundColor: budgetColour,
        }}
      />
    );
  }

  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      name, budgetRatio, monthProgress, actions,
    } = this.props;

    const monthProgressStyle = { left: `${monthProgress * 100}%` };

    const springSettings = {
      stiffness: 75,
      damping: 20,
    }

    return (
      <div className="category-progress" onClick={actions.showAddCost}>
        <div className="budget-name" ref={el => this.name = el}>
          {name}
        </div>

        <Motion
          defaultStyle={{ width: 0 }}
          style={{ width: spring(budgetRatio * 100, springSettings) }}
        >
          {styles => this.renderBudgetProgressWithMotion(styles)}
        </Motion>

        <div
          className="month-progress"
          style={monthProgressStyle}
          ref={el => this.monthProgress = el}
        />
      </div>
    );
  }
}

CategoryProgress.propTypes = {
  name: PropTypes.string.isRequired,
  budgetRatio: PropTypes.number.isRequired,
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
    budgetRatio: budgetRatioSelector(category),
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
