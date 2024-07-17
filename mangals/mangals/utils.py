import yaml


def convert_yml_dict(path_to_file):
    with open(path_to_file, "r") as file:
        data = yaml.load(file, Loader=yaml.FullLoader)
        return data

