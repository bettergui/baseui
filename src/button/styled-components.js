/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {KIND, SIZE, SHAPE} from './constants.js';
import type {SharedStylePropsT} from './types.js';

export const BaseButton = styled<SharedStylePropsT>(
  'button',
  ({$theme, $size, $kind, $shape, $isLoading, $isSelected, $disabled}) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    textDecoration: 'none',
    outline: 'none',
    WebkitAppearance: 'none',
    transitionProperty: 'background',
    transitionDuration: $theme.animation.timing100,
    transitionTimingFunction: $theme.animation.easeOutCurve,
    cursor: 'pointer',
    ':disabled': {
      cursor: 'not-allowed',
      backgroundColor: $theme.colors.buttonDisabledFill,
      color: $theme.colors.buttonDisabledText,
    },
    marginLeft: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    ...getFontStyles({$theme, $size}),
    ...getBorderRadiiStyles({$theme, $shape}),
    ...getPaddingStyles({$theme, $size, $shape}),
    // Kind style override
    ...getKindStyles({$theme, $kind, $isLoading, $isSelected, $disabled}),
  }),
);

export const EndEnhancer = styled<SharedStylePropsT>('div', ({$theme}) => ({
  display: 'flex',
  [$theme.direction === 'rtl' ? 'marginRight' : 'marginLeft']: $theme.sizing
    .scale500,
}));

export const StartEnhancer = styled<SharedStylePropsT>('div', ({$theme}) => ({
  display: 'flex',
  [$theme.direction === 'rtl' ? 'marginLeft' : 'marginRight']: $theme.sizing
    .scale500,
}));

export const LoadingSpinnerContainer = styled('div', {
  // To center within parent
  position: 'absolute',
});

export const LoadingSpinner = styled<SharedStylePropsT>(
  'div',
  ({$theme, $kind, $disabled}) => {
    const {foreground, background} = getLoadingSpinnerColors({
      $theme,
      $kind,
      $disabled,
    });
    return {
      height: $theme.sizing.scale600,
      width: $theme.sizing.scale600,
      borderTopLeftRadius: '50%',
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
      borderBottomLeftRadius: '50%',
      borderStyle: 'solid',
      borderWidth: $theme.sizing.scale0,
      borderTopColor: foreground,
      borderLeftColor: background,
      borderBottomColor: background,
      borderRightColor: background,
      animationDuration: $theme.animation.timing700,
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
      animationName: {
        to: {
          transform: 'rotate(360deg)',
        },
        from: {
          transform: 'rotate(0deg)',
        },
      },
    };
  },
);

function getLoadingSpinnerColors({$theme, $kind, $disabled}) {
  return {
    foreground: $disabled
      ? $theme.colors.mono600
      : $kind === KIND.primary
      ? $theme.colors.white
      : $theme.colors.primary,
    background: $disabled
      ? 'rgba(179, 179, 179, 0.32)'
      : $kind === KIND.primary
      ? 'rgba(255, 255, 255, 0.32)'
      : 'rgba(39, 110, 241, 0.32)',
  };
}

function getBorderRadiiStyles({$theme, $shape}) {
  let value = $theme.borders.buttonBorderRadius;

  if ($shape === SHAPE.round) {
    value = '50%';
  }

  return {
    borderTopRightRadius: value,
    borderBottomRightRadius: value,
    borderTopLeftRadius: value,
    borderBottomLeftRadius: value,
  };
}

function getFontStyles({$theme, $size}) {
  switch ($size) {
    case SIZE.compact:
      return $theme.typography.font450;
    case SIZE.large:
      return $theme.typography.font500;
    default:
      return $theme.typography.font470;
  }
}

function getPaddingStyles({$theme, $size, $shape}) {
  const defaultShape = $shape === SHAPE.default;
  switch ($size) {
    case SIZE.compact:
      return {
        paddingTop: $theme.sizing.scale200,
        paddingBottom: $theme.sizing.scale200,
        paddingLeft: defaultShape
          ? $theme.sizing.scale500
          : $theme.sizing.scale200,
        paddingRight: defaultShape
          ? $theme.sizing.scale500
          : $theme.sizing.scale200,
      };
    case SIZE.large:
      return {
        paddingTop: $theme.sizing.scale550,
        paddingBottom: $theme.sizing.scale550,
        paddingLeft: defaultShape
          ? $theme.sizing.scale700
          : $theme.sizing.scale550,
        paddingRight: defaultShape
          ? $theme.sizing.scale700
          : $theme.sizing.scale550,
      };
    default:
      return {
        paddingTop: $theme.sizing.scale500,
        paddingBottom: $theme.sizing.scale500,
        paddingLeft: defaultShape
          ? $theme.sizing.scale600
          : $theme.sizing.scale500,
        paddingRight: defaultShape
          ? $theme.sizing.scale600
          : $theme.sizing.scale500,
      };
  }
}

function getKindStyles({$theme, $isLoading, $isSelected, $kind, $disabled}) {
  if ($disabled) {
    return {};
  }
  switch ($kind) {
    case KIND.primary:
      return {
        color: $theme.colors.buttonPrimaryText,
        backgroundColor: $isSelected
          ? $theme.colors.buttonPrimaryHover
          : $theme.colors.buttonPrimaryFill,
        ':hover': {
          backgroundColor: $isLoading
            ? $theme.colors.buttonPrimaryActive
            : $theme.colors.buttonPrimaryHover,
        },
        ':focus': {
          backgroundColor: $isLoading
            ? $theme.colors.buttonPrimaryActive
            : $theme.colors.buttonPrimaryHover,
        },
        ':active': {
          backgroundColor: $theme.colors.buttonPrimaryActive,
        },
      };
    case KIND.secondary:
      return {
        color: $theme.colors.buttonSecondaryText,
        backgroundColor: $isSelected
          ? $theme.colors.buttonSecondaryHover
          : $theme.colors.buttonSecondaryFill,
        ':hover': {
          backgroundColor: $isLoading
            ? $theme.colors.buttonSecondaryActive
            : $theme.colors.buttonSecondaryHover,
        },
        ':focus': {
          backgroundColor: $isLoading
            ? $theme.colors.buttonSecondaryActive
            : $theme.colors.buttonSecondaryHover,
        },
        ':active': {
          backgroundColor: $theme.colors.buttonSecondaryActive,
        },
      };
    case KIND.tertiary:
      if ($isSelected) {
        return {
          color: $theme.colors.buttonTertiarySelectedText,
          backgroundColor: $theme.colors.buttonTertiarySelectedFill,
        };
      } else {
        return {
          color: $theme.colors.buttonTertiaryText,
          backgroundColor: $theme.colors.buttonTertiaryFill,
          ':hover': {
            backgroundColor: $isLoading
              ? $theme.colors.buttonTertiaryActive
              : $theme.colors.buttonTertiaryHover,
          },
          ':focus': {
            backgroundColor: $isLoading
              ? $theme.colors.buttonTertiaryActive
              : $theme.colors.buttonTertiaryHover,
          },
          ':active': {
            backgroundColor: $theme.colors.buttonTertiaryActive,
          },
        };
      }
    case KIND.minimal:
      return {
        color: $theme.colors.buttonMinimalText,
        backgroundColor: $isSelected
          ? $theme.colors.buttonMinimalHover
          : $theme.colors.buttonMinimalFill,
        ':hover': {
          backgroundColor: $isLoading
            ? $theme.colors.buttonMinimalActive
            : $theme.colors.buttonMinimalHover,
        },
        ':focus': {
          backgroundColor: $isLoading
            ? $theme.colors.buttonMinimalActive
            : $theme.colors.buttonMinimalHover,
        },
        ':active': {
          backgroundColor: $theme.colors.buttonMinimalActive,
        },
      };
    default:
      return {};
  }
}
