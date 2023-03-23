#!/usr/bin/env node

import { program } from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');
program.option('-f, --format <type>', 'output format')
  .parse(process.argv);
